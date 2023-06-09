import { useRouter } from "next/router";
import { z } from "zod";
import DownloadButtons from "../../components/DownloadButton";
import Shell from "../../components/Shell";
import { OnTargetTable } from "../../components/Table";
import { useOnTarget } from "../../hooks/useOnTarget";
import { Legend } from "../../components/Legend";
import { useState } from "react";

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
    description:
      "The total number of mismatches present in the spacer's alignment to the hg38 reference genome.",
  },
  {
    name: "Edit Distance",
    description:
      "The minimal number of one-nucleotide edits (substitutions, insertions and deletions) needed to transform the spacer sequence into the alignment sequence.",
  },
  {
    name: "Distance to TSS",
    description:
      "Duis eu lacus dui. In posuere leo ut fringilla ornare. Proin a bibendum massa. Maecenas varius dui erat, in ultricies metus pharetra sed. Aenean vulputate id orci at varius.",
  },

  {
    name: "Off-Target Count",
    description:
      "The number of off-target alignments (with edit distance <= 3) with matching PAM sequence.",
  },
  {
    name: "Query Off Targets",
    description: "Click here to investigate sequence identity of off-targets.",
  },
];
const Results = () => {
  const [legendOpen, setLegendOpen] = useState(false);
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
        <div className="self-end">
          <Legend columns={columns} open={legendOpen} setOpen={setLegendOpen} />
        </div>
        <section className="rounded-xl bg-white px-8 py-6">
          <div className="sm:flex sm:items-center">
            <div className="sm:flex-auto">
              <h1 className="px-2 text-xl font-semibold text-gray-900">
                {target_gene} | {effect}
              </h1>
            </div>
          </div>
          <TableViz
            target_gene={slug.data.target_gene}
            effect={slug.data.effect}
            toggleLegendOpen={() => setLegendOpen(true)}
          />
        </section>
      </div>
    </Shell>
  );
};

const TableViz = ({
  target_gene,
  effect,
  toggleLegendOpen,
}: {
  target_gene: string;
  effect: "Activation" | "Suppression";
  toggleLegendOpen: () => void;
}) => {
  const { data, error, isFetching } = useOnTarget({
    target_gene,
    effect,
  });
  if (error) {
    console.error(error);
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
      <span className="mt-2 flex w-full justify-end lg:-mt-8">
        <DownloadButtons
          data={data.map((row) => {
            const x = { ...row, search: undefined };
            delete x.search;
            return x;
          })}
          fileName={`${target_gene}_${effect}_on_target`}
        />
      </span>

      <OnTargetTable
        data={data}
        geneid={target_gene}
        toggleLegendOn={toggleLegendOpen}
      />
    </section>
  );
};

export default Results;
