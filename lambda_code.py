import time
import os
import json
import boto3
import botocore
import botocore.session as bc
from botocore.client import Config

print("Loading function")

secret_name = os.environ["SecretId"]  # getting SecretId from Environment varibales
session = boto3.session.Session()
region = session.region_name

# Initializing Secret Manager's client
client = session.client(service_name="secretsmanager", region_name=region)

get_secret_value_response = client.get_secret_value(SecretId=secret_name)
secret_arn = get_secret_value_response["ARN"]

secret = get_secret_value_response["SecretString"]

secret_json = json.loads(secret)

cluster_id = secret_json["dbClusterIdentifier"]

print(region, cluster_id)

# Initializing Botocore client
bc_session = bc.get_session()

session = boto3.Session(botocore_session=bc_session, region_name=region)

# Initializing Redshift's client
config = Config(connect_timeout=5, read_timeout=10)  # 10 second time out on reads
client_redshift = session.client("redshift-data", config=config)


def reverse_complement(seq):
    base_pairs = {
        "A": "T",
        "T": "A",
        "G": "C",
        "C": "G",
        "a": "t",
        "t": "a",
        "g": "c",
        "c": "g",
        "N": "N",
        "n": "n",
    }
    return "".join([base_pairs[base] for base in seq[::-1]])


def lambda_handler(event, context):
    print("Entered lambda_handler")
    # Parse the POST payload
    body = json.loads(event.get("body", "{}"))
    print(f"{body=}")

    query_type = body.get("query_type", None)
    if query_type is None:
        error_msg = f"query_type is a required post parameter. Received {query_type=}"
        return {
            "statusCode": 400,
            "body": json.dumps({"error": error_msg}),
            "headers": {"Content-Type": "application/json"},
        }

    if query_type == "on_target":
        print("ON TARGET QUERY")
        target_gene = body.get("target_gene", None)
        effect = body.get("effect", None)
        if target_gene is None or effect is None:
            error_msg = f"target_gene and effect are required post parameters. Received {target_gene=} {effect=}"
            return {
                "statusCode": 400,
                "body": json.dumps({"error": error_msg}),
                "headers": {"Content-Type": "application/json"},
            }
        print(f"{target_gene=} {effect=}")
        table_name = "on_target"
        sql_params = [{"name": "target_gene", "value": target_gene}]
        query_str = f"SELECT * FROM {table_name} where geneid=:target_gene"

    elif query_type == "off_target":
        print("OFF TARGET QUERY")
        guide = body.get("guide", None)
        if guide is None:
            error_msg = f"guide is a required post parameter. Received {guide=}"
            return {
                "statusCode": 400,
                "body": json.dumps({"error": error_msg}),
                "headers": {"Content-Type": "application/json"},
            }
        print(f"{guide=}")
        table_name = "off_target"
        reverse_complement_guide = reverse_complement(guide)
        sql_params = [
            {"name": "spacer", "value": guide},
            {"name": "reverse_spacer", "value": reverse_complement_guide},
        ]
        query_str = (
            f"SELECT * FROM {table_name} WHERE spacer=:spacer OR spacer=:reverse_spacer"
        )

    else:
        error_msg = f"Invalid query_type. Received {query_type=}"
        return {
            "statusCode": 400,
            "body": json.dumps({"error": error_msg}),
            "headers": {"Content-Type": "application/json"},
        }

    try:
        response = client_redshift.execute_statement(
            Database="dev",
            SecretArn=secret_arn,
            Sql=query_str,
            Parameters=sql_params,
            ClusterIdentifier=cluster_id,
        )
        print(f"query: {query_str}, response: {response}")
        print("API successfully executed")

        query_id = response["Id"]
        while True:
            status_response = client_redshift.describe_statement(Id=query_id)
            status = status_response["Status"]
            if status in ("FAILED", "FINISHED"):
                break
            time.sleep(1)  # Wait for 1 second before checking the status again

        if status == "FAILED":
            print("Query execution failed.")
            print(f"status_response: {status_response}")
            return {
                "statusCode": 400,
                "body": json.dumps({"error": "Query execution failed."}),
                "headers": {"Content-Type": "application/json"},
            }

        result_response = client_redshift.get_statement_result(Id=query_id)
        result = result_response["Records"]
        print("Result:", result)
        return {
            "statusCode": 200,
            "body": json.dumps(result),
            "headers": {"Content-Type": "application/json"},
        }
    except botocore.exceptions.ConnectionError as e:
        client_redshift_1 = session.client("redshift-data", config=config)
        result = client_redshift_1.execute_statement(
            Database="dev",
            SecretArn=secret_arn,
            Sql=query_str,
            ClusterIdentifier=cluster_id,
        )
        print("API executed after reestablishing the connection")
        return {
            "statusCode": 200,
            "body": json.dumps(result),
            "headers": {"Content-Type": "application/json"},
        }

    except Exception as e:
        raise Exception(e)
    return str(result)
