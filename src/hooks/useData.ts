import { useQuery } from "react-query";
import wretch from "wretch";
import { z } from "zod";
import { TableDataSchema } from "../schemas/dataSchema";

export const useData = ({
  target_gene,
  effect,
  off_target,
}: {
  target_gene: string;
  effect: "Activation" | "Suppression";
  off_target: boolean;
}) => {
  const fetchFunc = async () => {
    const url = "/api/data";

    const rawData = await wretch(url)
      .post({
        target_gene,
        effect,
        off_target,
      })
      .json();
    const parsed = z.array(TableDataSchema).safeParse(rawData);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error("Couldn't parse api response");
    }
    return parsed.data;
  };
  return useQuery(["dataQuery", target_gene, effect, off_target], fetchFunc, {
    refetchOnWindowFocus: false,
  });
};
