import { z } from "zod";

export const TableData = z.object({
  chr: z.coerce.string(),
  start: z.coerce.number(),
  end: z.coerce.number(),
  strand: z.coerce.string(),
  spacer: z.coerce.string(),
  num_mismatches: z.coerce.string(), // encoded in some format
  edit_distance: z.coerce.string(), // encoded in some format
  sequence: z.coerce.string(),
  geneID: z.coerce.string(),
});
export type TableData = z.infer<typeof TableData>;
export const Table = ({ data }: { data: TableData[] }) => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 ">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">
            Results: Suppression
          </h1>
          <p className="mt-2 text-sm text-gray-700">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget
            nunc justo. Ut vel magna enim. Sed sit amet purus eget purus
            accumsan dignissim.
          </p>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center">
        <div className="-my-2 -mx-4 sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle">
            <div className="shadow-sm ring-1 ring-black ring-opacity-5">
              <table
                className="min-w-full border-separate"
                style={{ borderSpacing: 0 }}
              >
                <thead className="bg-gray-50">
                  <tr>
                    {Object.keys(data[0]).map((column) => (
                      <th
                        key={column}
                        scope="col"
                        className="sticky top-0 z-10 border-b border-gray-300 bg-gray-50 bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                      >
                        {column}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data.map((datum, datumIdx) => (
                    <tr key={`row-${datumIdx}`}>
                      {Object.entries(datum).map(([column, value]) => (
                        <td
                          key={`row-${datumIdx}-${column}`}
                          className="border-b border-gray-200 py-3.5 pl-4 pr-3 text-xs font-medium text-gray-900 sm:pl-6 lg:pl-8"
                        >
                          {value}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
