import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const metaSchema = asObjectSchema(
  {
    notes: asStringSchema(0, 2000),
    tags: asArraySchema(0, 50, true, asStringSchema(1, 40)),
  },
  "Non-canonical metadata",
  { additionalProperties: true, required: [] }
);