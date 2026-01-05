import { asEnumSchema } from "../../../helpers/JsonSchema/asEnumSchema.mjs";
import { asNumberSchema } from "../../../helpers/JsonSchema/asNumberSchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";

export const outputLimitsSchema = asObjectSchema(
  {
    target_word_count: asNumberSchema(10, 5000),
    hard_word_max: asNumberSchema(10, 8000, ">= target_word_count"),
    title_style: asEnumSchema(["plain", "poetic", "coded", "timestamped", "headline"]),
  },
  "Output sizing/styling limits",
  { required: ["target_word_count"] }
);