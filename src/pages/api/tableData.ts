import { promises as fs } from "fs";
import path from "path";

export const loadOnTargetData = async () => {
  const dataDirectory = path.join(process.cwd(), "src/data");
  try {
    //Read the json data file data.json
    const fileContents = await fs.readFile(
      dataDirectory + "/on_target.csv",
      "utf8"
    );
    return fileContents;
  } catch (err) {
    console.error(err);
    throw new Error(
      "Error loading on target file from " + dataDirectory + "/on_target.csv"
    );
  }
};
export const loadOffTargetData = async () => {
  try {
    const dataDirectory = path.join(process.cwd(), "src/data");
    //Read the json data file data.json
    const fileContents = await fs.readFile(
      dataDirectory + "/off_target.csv",
      "utf8"
    );
    return fileContents;
  } catch (err) {
    console.error(err);
    throw new Error("Error loading off target file");
  }
};

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
