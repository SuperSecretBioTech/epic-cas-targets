import { promises as fs } from "fs";
import path from "path";
import { TableData } from "../../components/Table";

export const loadOnTargetData = async (): Promise<TableData[]> => {
  const dataDirectory = path.join(process.cwd(), "src/data");
  try {
    //Read the json data file data.json
    const fileContents = await fs.readFile(
      dataDirectory + "/on_target.csv",
      "utf8"
    );
    const offTargetJson = parseToJSON(fileContents.split("\n"));
    return offTargetJson
      .map((offTarget) => TableData.parse(offTarget))
      .slice(0, 10);
  } catch (err) {
    console.error("ERR", err);
    throw err;
    throw new Error(
      "Error loading on target file from " + dataDirectory + "/on_target.csv"
    );
  }
};
export const loadOffTargetData = async (): Promise<TableData[]> => {
  try {
    const dataDirectory = path.join(process.cwd(), "src/data");
    //Read the json data file data.json
    const fileContents = await fs.readFile(
      dataDirectory + "/off_target.csv",
      "utf8"
    );
    const offTargetJson = parseToJSON(fileContents.split("\n"));
    return offTargetJson.map((offTarget) => TableData.parse(offTarget));
  } catch (err) {
    console.error(err);
    throw new Error("Error loading off target file");
  }
};
function parseToJSON(lines: string[]): unknown[] {
  if (lines.length <= 2) return [];
  const headers = lines[0]?.split(",").filter((h) => h !== "");
  if (!headers) return [];

  const jsonArr: unknown[] = [];
  lines.slice(1).forEach((line) => {
    const currentLine = line
      .split(",")
      .map((h) => h.trim())
      .filter((h) => h !== "");

    const obj = Object.fromEntries(
      headers.map((key, idx) => {
        const value = currentLine[idx];

        return [key, value];
      })
    );
    jsonArr.push(obj);
  });
  return jsonArr;
}

// export const useOffTargetData = () => {
//   return useQuery("offTarget", async () => {
//     const offTarget = await loadOffTargetData();
//     return offTarget;
//   });
// };
// export const useOnTargetData = () => {
//   return useQuery("onTarget", async () => {
//     const onTarget = await loadOnTargetData();
//     return onTarget;
//   });
// };
