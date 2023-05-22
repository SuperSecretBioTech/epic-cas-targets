import { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";
import { z } from "zod";
import { GENES } from "../../data/genes";
import { dataSchema } from "../../schemas/dataSchema";

const responseSchema = z.union([
  z.array(z.any()), // did we get data?
  z.object({
    //  did we get an error?
    errorMessage: z.string(),
  }),
]);
const requestSchema = z.object({
  target_gene: z.enum(GENES),
  effect: z.enum(["Activation", "Suppression"]),
  off_target: z.boolean(),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url =
    "https://vehbuyav4p4ats5tgvs7w7ruty0mixag.lambda-url.us-west-2.on.aws/";
  const parsed = requestSchema.safeParse(req.body);
  if (!parsed.success) {
    console.log("Invalid request body");
    console.log(parsed.error);
    return res.status(400).json({ error: parsed.error });
  }
  const { target_gene, effect, off_target } = parsed.data;

  try {
    const rawData = await wretch(url)
      .post({
        target_gene,
        effect,
        off_target,
      })
      .json();
    const resParsed = responseSchema.safeParse(rawData);
    if (!resParsed.success) {
      console.log("Invalid response shape");
      console.log(resParsed.error);
      console.log(rawData);
      return res
        .status(500)
        .json({ error: "Unknown response received from lambda" });
    }
    if ("errorMessage" in resParsed.data) {
      console.log("Error from lambda");
      console.log(resParsed.data.errorMessage);
      return res.status(500).json({ error: resParsed.data.errorMessage });
    }
    console.log(resParsed.data);

    const parsed = dataSchema.safeParse(resParsed.data);
    if (!parsed.success) {
      console.log(resParsed.data);
      console.log(parsed.error);
      return res
        .status(500)
        .json({ error: "Invalid data recieved from lambda" });
    }

    return res.status(200).json(parsed.data);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error });
  }
}
