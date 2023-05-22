import { z } from "zod";

const coreData = [
  z.object({ stringValue: z.string() }),
  z.object({ longValue: z.number() }),
  z.object({ longValue: z.number() }),
  z.object({ stringValue: z.enum(["+", "-"]) }),
  z.object({ stringValue: z.string().regex(/^[ATCGatcg]+$/) }),
  z.object({ stringValue: z.string() }),
  z.object({ stringValue: z.string() }),
  z.object({ stringValue: z.string().regex(/^[ATCGatcg]+$/) }),
  z.object({ stringValue: z.string() }),
  z.object({ booleanValue: z.boolean() }).optional(), // unused
  z.object({ booleanValue: z.boolean() }).optional(), // unused
  z.object({ doubleValue: z.number() }).optional(), // unused
] as const;
export const dataSchema = z.array(z.tuple([...coreData])).transform((data) =>
  data.map((datum) =>
    TableDataSchema.parse({
      chr: datum[0].stringValue,
      start: datum[1].longValue,
      end: datum[2].longValue,
      strand: datum[3].stringValue,
      spacer: datum[4].stringValue.toUpperCase(),
      num_mismatches: datum[5].stringValue,
      edit_distance: datum[6].stringValue,
      sequence: datum[7].stringValue.toUpperCase(),
      num_off_targets: datum[11]?.doubleValue,
    })
  )
);

export const TableDataSchema = z.object({
  chr: z.string(),
  start: z.number(),
  end: z.number(),
  strand: z.string(),
  spacer: z.string(),
  // num_mismatches: z.string(), // encoded in some format
  // edit_distance: z.string(), // encoded in some format
  sequence: z.string(),
  num_off_targets: z.number().optional(),
});
