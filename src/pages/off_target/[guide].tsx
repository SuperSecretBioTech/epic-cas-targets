import { useRouter } from "next/router";
import { useState } from "react";
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
    description: "Chromosome number (hg38).",
  },
  {
    name: "Start",
    description: "Guide start position (genomic coordinates based on hg38).",
  },
  {
    name: "End",
    description: "Guide end position (genomic coordinates based on hg38).",
  },
  {
    name: "Strand",
    description: "Positive/Negative strand information.",
  },
  {
    name: "Spacer",
    description: "20bp spacer sequence.",
  },
  {
    name: "Mismatch Count",
    description: "The total number of mismatches present in the spacer's alignment to the hg38 reference genome.",
  },
  {
    name: "Edit Distance",
    description:
      "The minimal number of one-nucleotide edits (substitutions, insertions and deletions) needed to transform the spacer sequence into the alignment sequence.",
  },
];
const Results = () => {
  const [legendOpen, setLegendOpen] = useState(false);
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
          <Legend columns={columns} open={legendOpen} setOpen={setLegendOpen} />
        </div>

        <section className="rounded-xl bg-white px-8 py-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="text-xl font-semibold text-gray-900 px-2 ">
                Guide: {guide} | {target_gene}
              </h1>
            </div>
          </div>
          <TableViz
            guide={guide}
            geneid={target_gene}
            toggleLegendOpen={() => setLegendOpen(true)}
          />
        </section>
      </div>
    </Shell>
  );
};

const TableViz = ({
  guide,
  geneid,
  toggleLegendOpen,
}: {
  guide: string;
  geneid: string;
  toggleLegendOpen: () => void;
}) => {
  const { data, error, isFetching } = useOffTarget({
    guide,
    target_gene: geneid,
  });
  if (error) {
    return (
      <div className="my-8 mx-auto flex h-40 w-full max-w-xl items-center justify-center gap-2 text-red-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 flex-shrink-0 stroke-current"
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
      <div className="flex h-40 w-full items-center justify-center ">
        <progress className="progress progress-primary w-56"></progress>
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <section className="grid h-40 content-center rounded-xl bg-white px-8 py-6">
        <div className="mx-auto text-3xl font-semibold text-gray-400">
          No data available.
        </div>
      </section>
    );
  }
  return (
    <section>
      <span className="lg:-mt-8 mt-2 flex w-full justify-end">
        <DownloadButtons
          data={data}
          fileName={`${geneid}_${guide}_off_target`}
        />
      </span>
      <OffTargetTable data={data} toggleLegendOn={toggleLegendOpen} />
    </section>
  );
};

export default Results;
