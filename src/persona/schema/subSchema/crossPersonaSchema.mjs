import { asBooleanSchema } from "../../../helpers/JsonSchema/asBooleanSchema.mjs";
import { asEnumSchema } from "../../../helpers/JsonSchema/asEnumSchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";

export const crossPersonaSchema = asObjectSchema(
  {
    enabled: asBooleanSchema(),
    borrowStrength: asEnumSchema(["low", "medium", "high"]),
  },
  "Cross-persona borrowing behavior",
  { required: ["enabled", "borrowStrength"] }
);