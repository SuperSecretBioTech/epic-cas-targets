import { ExclamationTriangleIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/router";
import { z } from "zod";
import Shell from "../../components/Shell";
import { Table } from "../../components/Table";
import { useOnTarget } from "../../hooks/useOnTarget";

// matches ASCL1_+ or ASCL1_-
const slugSchema = z
  .string()
  .regex(/[0-9A-Z-]_(Activation|\Suppression)/)
  .transform((data) => {
    return z
      .tuple([z.string(), z.enum(["Activation", "Suppression"] as const)])
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

  const { target_gene, effect } = slug.data;

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <section className="rounded-xl bg-white px-8 py-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                {target_gene} | {effect} |{" "}
              </h1>
            </div>
          </div>
          <TableViz
            target_gene={slug.data.target_gene}
            effect={slug.data.effect}
          />
        </section>
      </div>
    </Shell>
  );
};

const TableViz = ({
  target_gene,
  effect,
}: {
  target_gene: string;
  effect: "Activation" | "Suppression";
}) => {
  const { data, error, isFetching } = useOnTarget({
    target_gene,
    effect,
  });
  if (error) {
    console.error(error);
    return (
      <div className="text-red-400 flex w-full max-w-xl h-40 gap-2 items-center justify-center my-8 mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current flex-shrink-0 h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span className="text-xl">
          Something went wrong! Please try again later.
        </span>
      </div>
    );
  }
  if (isFetching) {
    return (
      <div className="h-40 w-full flex justify-center items-center ">
        <progress className="progress progress-primary w-56"></progress>
      </div>
    );
  }
  if (!data) {
    return <div> Got no Data </div>;
  }
  return <Table data={data} />;
};

export default Results;
