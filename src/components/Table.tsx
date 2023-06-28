import { InformationCircleIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";
import { OffTargetData, OnTargetData } from "../schemas/dataSchema";

const MAX_MISMATCHES = 5000;
export const OnTargetTable = ({
  data,
  geneid,
  toggleLegendOn,
}: {
  data: OnTargetData;
  geneid: string;
  toggleLegendOn: () => void;
}) => {
  const [sortingOrder, setSortingOrder] = useState<"asc" | "desc">("asc");
  const filteredData = data.filter((d) => d.num_off_targets <= MAX_MISMATCHES);
  const sortedData = filteredData.sort((a, b) => {
    if (sortingOrder === "asc") {
      return (a.num_off_targets ?? 0) - (b.num_off_targets ?? 0);
    } else {
      return (b.num_off_targets ?? 0) - (a.num_off_targets ?? 0);
    }
  });

  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  <span className="px-2">Chromosome</span>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Start
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  End
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Strand
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Spacer
                </th>
                <th scope="col" className="px-3 py-3.5">
                  <div className="flex items-end gap-2">
                    <span className="text-left text-sm font-semibold text-gray-900 ">
                      Mismatch Count
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        toggleLegendOn();
                      }}
                    >
                      <InformationCircleIcon className="my-auto h-7 w-7 text-gray-400 hover:text-brand-700 lg:h-5 lg:w-5" />
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3.5">
                  <div className="flex items-end gap-2 ">
                    <span className="text-left text-sm font-semibold text-gray-900 ">
                      Edit Distance
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        toggleLegendOn();
                      }}
                    >
                      <InformationCircleIcon className="my-auto h-7 w-7 text-gray-400 hover:text-brand-700 lg:h-5 lg:w-5" />
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3.5">
                  <div className="flex items-end gap-2 ">
                    <span className="text-left text-sm font-semibold text-gray-900 ">
                      Distance to TSS
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        toggleLegendOn();
                      }}
                    >
                      <InformationCircleIcon className="my-auto h-7 w-7 text-gray-400 hover:text-brand-700 lg:h-5 lg:w-5" />
                    </button>
                  </div>
                </th>
                <th scope="col" className=" px-1 py-3.5">
                  <div className="flex">
                    <span className="text-left text-sm font-semibold text-gray-900 ">
                      Off-Target Count
                    </span>
                    <button
                      type="button"
                      className="btn-outline btn-xs btn w-[10px] self-end"
                      onClick={() => {
                        setSortingOrder(
                          sortingOrder === "asc" ? "desc" : "asc"
                        );
                      }}
                    >
                      {sortingOrder === "asc" ? "▲" : "▼"}
                    </button>
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Query Off Targets
                </th>
              </tr>
            </thead>
            <tbody>
              {sortedData.map((datum) => (
                <tr key={JSON.stringify(datum)} className="hover:bg-gray-100">
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <span className="px-2">{datum.chr}</span>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.start}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.end}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.strand}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.pos_guide}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.num_mismatches}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.edit_distance}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.distance_to_tss}
                  </td>

                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.num_off_targets}
                  </td>
                  <td className="relative flex items-center border-l py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    {datum.num_off_targets > 0 ? (
                      <Link
                        href={`/off_target/${geneid}_${datum.pos_guide}_${datum.neg_guide}`}
                        className="text-brand-600 hover:text-brand-900"
                      >
                        Search
                      </Link>
                    ) : (
                      <span className="text-gray-400">Search</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export const OffTargetTable = ({
  data,
  toggleLegendOn,
}: {
  data: OffTargetData;
  toggleLegendOn: () => void;
}) => {
  return (
    <div className="flow-root">
      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead className="bg-white">
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  <span className="px-2">Chromosome</span>
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Start
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  End
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Strand
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Spacer
                </th>
                <th scope="col" className="px-3 py-3.5">
                  <div className="flex items-end gap-2">
                    <span className="text-left text-sm font-semibold text-gray-900 ">
                      Number of Mismatches
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        toggleLegendOn();
                      }}
                    >
                      <InformationCircleIcon className="my-auto h-7 w-7 text-gray-400 hover:text-brand-700 lg:h-5 lg:w-5" />
                    </button>
                  </div>
                </th>
                <th scope="col" className="px-3 py-3.5">
                  <div className="flex items-end gap-2 ">
                    <span className="text-left text-sm font-semibold text-gray-900 ">
                      Edit Distance
                    </span>
                    <button
                      type="button"
                      onClick={() => {
                        toggleLegendOn();
                      }}
                    >
                      <InformationCircleIcon className="my-auto h-7 w-7 text-gray-400 hover:text-brand-700 lg:h-5 lg:w-5" />
                    </button>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((datum) => (
                <tr key={JSON.stringify(datum)} className="hover:bg-gray-100">
                  <td className="py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    <span className="px-2">{datum.chr}</span>
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.start}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.end}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.strand}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.spacer}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.num_mismatches}
                  </td>
                  <td className="px-3 py-4 text-sm text-gray-500">
                    {datum.edit_distance}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
