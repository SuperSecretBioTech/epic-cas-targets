import { NextApiRequest, NextApiResponse } from "next";
import wretch, { WretchError } from "wretch";
import { z } from "zod";
import { GENES } from "../../data/genes";
import { dataSchema } from "../../schemas/dataSchema";
const errorSchema = z.object({
  json: z.object({
    error: z.object({
      json: z.object({
        error: z.string(),
      }),
    }),
  }),
});

const responseSchema = z.union([
  z.array(z.any()), // did we get data?
  z.object({
    //  did we get an error?
    errorMessage: z.string().transform((data) => {
      let jsonParsed = null;
      try {
        jsonParsed = JSON.parse(data);
      } catch {
        return `Failed to parse error into json ${data}`;
      }
      const parsed = errorSchema.parse(jsonParsed);
      return parsed.json.error.json.error;
    }),
  }),
]);

const requestSchema = z.object({
  target_gene: z.enum(GENES),
  effect: z.enum(["Activation", "Suppression"]),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url =
    "https://vehbuyav4p4ats5tgvs7w7ruty0mixag.lambda-url.us-west-2.on.aws/";
  const reqParsed = requestSchema.safeParse(req.body);
  if (!reqParsed.success) {
    return res.status(400).json({ error: reqParsed.error });
  }
  const { target_gene, effect } = reqParsed.data;

  let rawData = null;
  try {
    rawData = await wretch(url)
      .post({
        target_gene,
        effect,
      })
      .json();
  } catch (err: any) {
    const error = err as WretchError;
    const errorSchema = z.string().transform((data) => {
      let jsonParsed = null;
      try {
        jsonParsed = JSON.parse(data);
      } catch {
        return `Failed to parse error into json:  ${data}`;
      }

      const parsed = z.object({ error: z.string() }).parse(jsonParsed);
      return parsed.error;
    });
    const parsedError = errorSchema.safeParse(error.message);
    if (!parsedError.success) {
      return res.status(500).json({ error: "An unknown error occured" });
    }
    return res.status(500).json({ error: parsedError.data });
  }

  const resParsed = responseSchema.safeParse(rawData);
  if (!resParsed.success) {
    return res
      .status(500)
      .json({ error: "Unknown response received from lambda" });
  }
  if ("errorMessage" in resParsed.data) {
    return res.status(500).json({ error: resParsed.data.errorMessage });
  }
  const dataParsed = dataSchema.safeParse(resParsed.data);
  if (!dataParsed.success) {
    console.log(resParsed.data);
    console.log(dataParsed.error);
    return res.status(500).json({ error: "Invalid data recieved from lambda" });
  }

  return res.status(200).json(dataParsed.data);
}
