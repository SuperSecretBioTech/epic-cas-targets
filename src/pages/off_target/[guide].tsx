import { useRouter } from "next/router";
import { z } from "zod";
import DownloadButtons from "../../components/DownloadButton";
import { Legend } from "../../components/Legend";
import Shell from "../../components/Shell";
import { OffTargetTable } from "../../components/Table";
import { useOffTarget } from "../../hooks/useOfftarget";

const slugSchema = z
  .string()
  .regex(/[0-9A-Z-]_[ATCG]+$/)
  .transform((data) => {
    return z
      .tuple([z.string(), z.string()])
      .transform((data) => ({ target_gene: data[0], guide: data[1] }))
      .parse(data.split("_"));
  });

const columns = [
  {
    name: "Chromosome",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc justo. Ut vel magna enim. Sed sit amet purus eget purus accumsan dignissim.",
  },
  {
    name: "Start",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc justo. Ut vel magna enim. Sed sit amet purus eget purus accumsan dignissim.",
  },
  {
    name: "End",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc justo. Ut vel magna enim. Sed sit amet purus eget purus accumsan dignissim.",
  },
  {
    name: "Strand",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc justo. Ut vel magna enim. Sed sit amet purus eget purus accumsan dignissim.",
  },
  {
    name: "Spacer",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc justo. Ut vel magna enim. Sed sit amet purus eget purus accumsan dignissim.",
  },
  {
    name: "Number of Mismatches",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc justo. Ut vel magna enim. Sed sit amet purus eget purus accumsan dignissim.",
  },
  {
    name: "Edit Distance",
    description:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget nunc justo. Ut vel magna enim. Sed sit amet purus eget purus accumsan dignissim.",
  },
];
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

  const { target_gene, guide } = slug.data;

  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div className="self-end">
          <Legend columns={columns} />
        </div>

        <section className="rounded-xl bg-white px-8 py-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900">
                Guide: {guide} | {target_gene}
              </h1>
            </div>
          </div>
          <TableViz guide={guide} geneid={target_gene} />
        </section>
      </div>
    </Shell>
  );
};

const TableViz = ({ guide, geneid }: { guide: string; geneid: string }) => {
  const { data, error, isFetching } = useOffTarget({
    guide,
    target_gene: geneid,
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
  return (
    <section>
      <span className="flex -mt-8 justify-end w-full">
        <DownloadButtons
          data={data}
          fileName={`${geneid}_${guide}_off_target`}
        />
      </span>
      <OffTargetTable data={data} />
    </section>
  );
};

export default Results;
