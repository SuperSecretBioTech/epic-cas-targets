import { useQuery } from "react-query";
import wretch from "wretch";
import { z } from "zod";
import { offTargetOutputSchema } from "../schemas/dataSchema";

export const useOffTarget = ({
  pos_guide,
  neg_guide,
  target_gene,
}: {
  pos_guide: string;
  neg_guide: string;
  target_gene: string;
}) => {
  const fetchFunc = async () => {
    const url = "/api/data";

    const rawData = await wretch(url)
      .post({
        pos_guide,
        neg_guide,
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
  return useQuery(["dataQuery", pos_guide, neg_guide], fetchFunc, {
    refetchOnWindowFocus: false,
  });
};
