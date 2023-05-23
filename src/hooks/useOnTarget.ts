import { useQuery } from "react-query";
import wretch, { WretchError } from "wretch";
import { z } from "zod";
import { onTargetOutputSchema } from "../schemas/dataSchema";

export const useOnTarget = ({
  target_gene,
  effect,
}: {
  target_gene: string;
  effect: "Activation" | "Suppression";
}) => {
  const fetchFunc = async () => {
    const url = "/api/data";
    let rawData = null;
    try {
      rawData = await wretch(url)
        .post({
          target_gene,
          effect,
          query_type: "on_target",
        })
        .json();
    } catch (err: any) {
      const error = err as WretchError;
      const errorSchema = z.string().transform((data) => {
        const parsed = z.object({ error: z.string() }).parse(JSON.parse(data));
        return parsed.error;
      });

      const parsedError = errorSchema.safeParse(error.message);
      if (!parsedError.success) {
        throw new Error("An unknown error occured");
      }
      throw new Error(parsedError.data);
    }
    const parsed = z.array(onTargetOutputSchema).safeParse(rawData);
    if (!parsed.success) {
      console.error(parsed.error);
      throw new Error("Couldn't parse onTarget api response");
    }
    return parsed.data;
  };
  return useQuery(["dataQuery", target_gene, effect], fetchFunc, {
    refetchOnWindowFocus: false,
  });
};
