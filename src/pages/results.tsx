import type { NextPage } from "next";
import Shell from "../components/Shell";
import { Table, TableData } from "../components/Table";
import { generateMockTableData } from "../utils/tableUtils";

export async function getStaticProps() {
  const data = generateMockTableData(100);

  return {
    props: {
      data,
    },
  };
}

const Results: NextPage<{ data: TableData[] }> = ({
  data,
}: {
  data: TableData[];
}) => {
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
          <Table data={data} />
        </div>
      </div>
    </Shell>
  );
};

export default Results;
