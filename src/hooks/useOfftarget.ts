import { useQuery } from "react-query";
import wretch from "wretch";
import { z } from "zod";
import { offTargetOutputSchema } from "../schemas/dataSchema";

export const useOffTarget = ({ guide }: { guide: string }) => {
  const fetchFunc = async () => {
    const url = "/api/data";

    const rawData = await wretch(url)
      .post({
        guide,
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
