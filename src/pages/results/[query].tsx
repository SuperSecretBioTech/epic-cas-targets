import { useQuery } from "react-query";
import wretch from "wretch";
import { useRouter } from "next/router";
import { z } from "zod";
import Shell from "../../components/Shell";
import { Table } from "../../components/Table";
import { dataSchema, TableDataSchema } from "../../schemas/dataSchema";

// matches ASCL1_+ or ASCL1_-
const slugSchema = z
  .string()
  .regex(/[0-9A-Z]_(\-|\+)/)
  .transform((data) => {
    return z
      .tuple([z.string(), z.enum(["+", "-"] as const)])
      .transform((data) => ({ target_gene: data[0], effect: data[1] }))
      .parse(data.split("_"));
  });
const Results = () => {
  const router = useRouter();
  const rawSlug = router.query.query;
  const slug = slugSchema.safeParse(rawSlug);
  if (!slug.success) {
    return <Shell>{JSON.stringify(slug.error)}.</Shell>;
  }
  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div className="rounded-lg bg-white px-5 py-6 shadow dark:bg-zinc-600 sm:px-6 ">
          <div className="grid h-60 content-center rounded-lg border-4 border-dashed border-gray-200">
            <h1 className="text-center text-xl font-semibold text-zinc-300 md:text-4xl lg:text-5xl">
              Visualization
            </h1>
          </div>
        </div>
        <div className="rounded-xl bg-white px-8 py-6">
          <TableViz
            target_gene={slug.data.target_gene}
            effect={slug.data.effect}
          />
        </div>
      </div>
    </Shell>
  );
};

const TableViz = ({
  target_gene,
  effect,
}: {
  target_gene: string;
  effect: "+" | "-";
}) => {
  const { data, error, isFetching } = useData({ target_gene, effect });
  if (error) {
    return <div>{JSON.stringify(error)} </div>;
  }
  if (isFetching) {
    return <div>Loading</div>;
  }
  if (!data) {
    return <div> Got no Data </div>;
  }
  return <Table data={data} />;
};

const useData = ({
  target_gene,
  effect,
}: {
  target_gene: string;
  effect: "+" | "-";
}) => {
  const fetchFunc = async () => {
    const url = "/api/data";

    const rawData = await wretch(url)
      .post({
        target_gene,
        effect,
      })
      .json();
    const parsed = z.array(TableDataSchema).safeParse(rawData);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error("Couldn't parse api response");
    }
    return parsed.data;
  };
  return useQuery(["dataQuery", target_gene, effect], fetchFunc, {
    refetchOnWindowFocus: false,
  });
};

export default Results;
