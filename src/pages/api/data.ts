import { NextApiRequest, NextApiResponse } from "next";
import wretch from "wretch";
import { z } from "zod";
import { dataSchema } from "../../schemas/dataSchema";

const responseSchema = z
  .object({
    body: z.string(),
  })
  .transform((data) => JSON.parse(data.body));
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const url =
    "https://kqz0t8uh04.execute-api.us-west-2.amazonaws.com/default/cas-backend";
  const { target_gene, effect } = req.body;

  try {
    const rawData = await wretch(url)
      .post({
        body: JSON.stringify({
          target_gene,
          effect,
        }),
      })
      .json();
    const resParsed = responseSchema.safeParse(rawData);

    if (!resParsed.success) {
      console.log("Invalid response shape");
      console.log(resParsed.error);
      console.log(rawData);
      return res
        .status(500)
        .json({ error: "Invalid response shape received from lambda" });
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
