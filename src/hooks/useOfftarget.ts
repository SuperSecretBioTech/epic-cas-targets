import { useQuery } from "react-query";
import wretch from "wretch";
import { z } from "zod";
import { TableDataSchema } from "../schemas/dataSchema";

export const useOffTarget = ({
  target_gene,
  effect,
  guide,
}: {
  target_gene: string;
  effect: "Activation" | "Suppression";
  guide: string;
}) => {
  const fetchFunc = async () => {
    const url = "/api/data";

    const rawData = await wretch(url)
      .post({
        target_gene,
        effect,
        guide,
      })
      .json();
    const parsed = z.array(TableDataSchema).safeParse(rawData);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error("Couldn't parse api response");
    }
    return parsed.data;
  };
  return useQuery(["dataQuery", target_gene, effect, guide], fetchFunc, {
    refetchOnWindowFocus: false,
  });
};
