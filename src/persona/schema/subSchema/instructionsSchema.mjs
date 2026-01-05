import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";
import { biasProfileSchema } from "./biasProfileSchema.mjs";
import { outputLimitsSchema } from "./outputLimitsSchema.mjs";
import { representationBiasSchema } from "./representationBiasSchema.mjs";

export const instructionsSchema = asObjectSchema(
  {
    role: asStringSchema(3, 120),
    style: asStringSchema(3, 200),
    timeline_bias: asStringSchema(3, 120),
    scope_of_truth: asStringSchema(3, 120),
    allowed_contributions: asArraySchema(1, 20, true, asStringSchema(3, 140)),
    writing_formats: asArraySchema(1, 20, true, asStringSchema(2, 60)),
    output_limits: outputLimitsSchema,
    hard_rules: asArraySchema(1, 40, true, asStringSchema(3, 200)),
    representation_bias: representationBiasSchema,
    bias_profile: biasProfileSchema,
  },
  "Generation instructions",
  { required: ["role", "style", "timeline_bias", "scope_of_truth", "allowed_contributions", "writing_formats", "hard_rules"] }
);