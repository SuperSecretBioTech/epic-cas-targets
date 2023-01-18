import type { NextPage } from "next";
import Shell from "../components/Shell";
import { Table } from "../components/Table";

const Results: NextPage = () => {
  return (
    <Shell>
      <div className="flex flex-col gap-8">
        <div className="rounded-xl bg-white px-8 py-6">
          <div className="rounded-lg bg-white px-5 py-6 shadow dark:bg-zinc-600 sm:px-6 ">
            <div className="grid h-60 content-center rounded-lg border-4 border-dashed border-gray-200">
              <h1 className="text-center text-7xl font-semibold text-zinc-300">
                Visualization
              </h1>
            </div>
          </div>
        </div>
        <div className="rounded-xl bg-white px-8 py-6">
          <Table />
        </div>
      </div>
    </Shell>
  );
};

export default Results;
