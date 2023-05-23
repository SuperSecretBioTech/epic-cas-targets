import { useRouter } from "next/router";
import { z } from "zod";
import Shell from "../../components/Shell";
import { OffTargetTable } from "../../components/Table";
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
  if (!data || data.length === 0) {
    return (
      <section className="rounded-xl bg-white px-8 py-6 h-40 grid content-center">
        <div className="text-3xl font-semibold text-gray-400 mx-auto">
          No data available.
        </div>
      </section>
    );
  }
  return <OffTargetTable data={data} />;
};

export default Results;
