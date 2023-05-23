import { z } from "zod";

export const onTargetOutputSchema = z.object({
  chr: z.string(),
  start: z.number(),
  end: z.number(),
  strand: z.enum(["+", "-"]),
  spacer: z.string().regex(/^[ATCGatcg]+$/),
  num_mismatches: z.string(),
  edit_distance: z.string(),
  sequence: z.string().regex(/^[ATCGatcg]+$/),
  num_off_targets: z.number().optional(),
  search: z.string(),
});

export const onTargetSchema = z
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
      z.object({ stringValue: z.string() }).optional(),
      z.object({ booleanValue: z.boolean() }).optional(),
      z.object({ booleanValue: z.boolean() }).optional(),
      z.object({ doubleValue: z.number() }),
    ])
  )
  .transform((data) =>
    data.map((datum) =>
      onTargetOutputSchema.parse({
        chr: datum[0].stringValue,
        start: datum[1].longValue,
        end: datum[2].longValue,
        strand: datum[3].stringValue,
        spacer: datum[4].stringValue.toUpperCase(),
        num_mismatches: datum[5].stringValue,
        edit_distance: datum[6].stringValue,
        sequence: datum[7].stringValue.toUpperCase(),
        num_off_targets: datum[11]?.doubleValue,
        search: `/off_target/${datum[4].stringValue.toUpperCase()}`, // uses the spacer as the search term
      })
    )
  );
export type OnTargetData = z.infer<typeof onTargetSchema>;

export const offTargetOutputSchema = z.object({
  chr: z.string(),
  start: z.number(),
  end: z.number(),
  strand: z.enum(["+", "-"]),
  spacer: z.string().regex(/^[ATCGatcg]+$/),
  num_mismatches: z.string(),
  edit_distance: z.string(),
  sequence: z.string().regex(/^[ATCGatcg]+$/),
});

export const offTargetSchema = z
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
    ])
  )
  .transform((data) =>
    data.map((datum) =>
      offTargetOutputSchema.parse({
        chr: datum[0].stringValue,
        start: datum[1].longValue,
        end: datum[2].longValue,
        strand: datum[3].stringValue,
        spacer: datum[4].stringValue.toUpperCase(),
        num_mismatches: datum[5].stringValue,
        edit_distance: datum[6].stringValue,
        sequence: datum[7].stringValue.toUpperCase(),
      })
    )
  );
export type OffTargetData = z.infer<typeof offTargetSchema>;
export const TableDataSchema = z.union([
  onTargetSchema,
  offTargetSchema,
] as const);
