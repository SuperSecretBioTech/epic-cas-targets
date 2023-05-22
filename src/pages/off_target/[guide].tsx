import { useRouter } from "next/router";
import { z } from "zod";
import Shell from "../../components/Shell";
import { Table } from "../../components/Table";
import { useOffTarget } from "../../hooks/useOfftarget";

// matches ASCL1_+ or ASCL1_-
const slugSchema = z
  .string()
  .regex(/[0-9A-Z-]_(Activation|\Suppression)_[0-9A-Z-]/)
  .transform((data) => {
    return z
      .tuple([
        z.string(),
        z.enum(["Activation", "Suppression"] as const, z.string()),
        z.string(),
      ])
      .transform((data) => ({
        target_gene: data[0],
        effect: data[1],
        guide: data[2],
      }))
      .parse(data.split("_"));
  });
const Results = () => {
  const router = useRouter();
  const rawSlug = router.query.query;
  const slug = slugSchema.safeParse(rawSlug);
  if (!slug.success) {
    return <Shell>{JSON.stringify(slug.error)}.</Shell>;
  }

  const { target_gene, effect, guide } = slug.data;

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <section className="rounded-xl bg-white px-8 py-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                {target_gene} | {effect} | {guide}
              </h1>
            </div>
          </div>
          <TableViz
            target_gene={slug.data.target_gene}
            effect={slug.data.effect}
            guide={slug.data.guide}
          />
        </section>
      </div>
    </Shell>
  );
};

const TableViz = ({
  target_gene,
  effect,
  guide,
}: {
  target_gene: string;
  effect: "Activation" | "Suppression";
  guide: string;
}) => {
  const { data, error, isFetching } = useOffTarget({
    target_gene,
    effect,
    guide,
  });
  if (error) {
    return <div>{JSON.stringify(error)} </div>;
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
