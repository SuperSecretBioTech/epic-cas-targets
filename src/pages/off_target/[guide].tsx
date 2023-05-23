import { useRouter } from "next/router";
import { z } from "zod";
import Shell from "../../components/Shell";
import { Table } from "../../components/Table";
import { useOffTarget } from "../../hooks/useOfftarget";

const slugSchema = z.string().regex(/[ATCG]+$/);

const Results = () => {
  const router = useRouter();
  const rawSlug = router.query.guide;
  const slug = slugSchema.safeParse(rawSlug);
  if (rawSlug === undefined) {
    return <Shell>No Guide provided</Shell>;
  }
  if (!slug.success) {
    console.error(slug.error);
    return <Shell>Invalid Guide: {rawSlug}</Shell>;
  }

  const guide = slug.data;

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <section className="rounded-xl bg-white px-8 py-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Guide: {guide}
              </h1>
            </div>
          </div>
          <TableViz guide={guide} />
        </section>
      </div>
    </Shell>
  );
};

const TableViz = ({ guide }: { guide: string }) => {
  const { data, error, isFetching } = useOffTarget({
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
