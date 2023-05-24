import { useQuery } from "react-query";
import wretch from "wretch";
import { z } from "zod";
import { offTargetOutputSchema } from "../schemas/dataSchema";

export const useOffTarget = ({
  guide,
  target_gene,
}: {
  guide: string;
  target_gene: string;
}) => {
  const fetchFunc = async () => {
    const url = "/api/data";

    const rawData = await wretch(url)
      .post({
        guide,
        target_gene,
        query_type: "off_target",
      })
      .json();
    const parsed = z.array(offTargetOutputSchema).safeParse(rawData);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error("Couldn't parse offTarget api response");
    }
    return parsed.data;
  };
  return useQuery(["dataQuery", guide], fetchFunc, {
    refetchOnWindowFocus: false,
  });
};
