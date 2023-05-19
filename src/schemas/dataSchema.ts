import { z } from "zod";

export const dataSchema = z
  .array(
    z.tuple([
      z.object({ stringValue: z.string() }),
      z.object({ longValue: z.number() }),
      z.object({ longValue: z.number() }),
      z.object({ stringValue: z.enum(["+", "-"]) }),
      z.object({ stringValue: z.string().regex(/^[ATCGatcg]+$/) }),
      z.object({ stringValue: z.string() }),
      z.object({ stringValue: z.string() }),
      z.object({ stringValue: z.string().regex(/^[ATCGatcg]+$/) }),
      z.object({ stringValue: z.string() }),
      z.object({ booleanValue: z.boolean() }), // unused
      z.object({ booleanValue: z.boolean() }), // unused
      z.object({ doubleValue: z.number() }), // unused
    ])
  )
  .transform((data) =>
    data.map((datum) => ({
      chr: datum[0].stringValue,
      start: datum[1].longValue,
      end: datum[2].longValue,
      strand: datum[3].stringValue,
      spacer: datum[4].stringValue.toUpperCase(),
      num_mismatches: datum[5].stringValue,
      edit_distance: datum[6].stringValue,
      sequence: datum[7].stringValue.toUpperCase(),
      geneId: datum[8].stringValue,
    }))
  );
