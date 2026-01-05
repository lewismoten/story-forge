import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const biasProfileSchema = asObjectSchema(
  {
    motivations: asArraySchema(0, 12, true, asStringSchema(2, 60)),
    taboos: asArraySchema(0, 12, true, asStringSchema(2, 60)),
    loyalties: asArraySchema(0, 12, true, asStringSchema(2, 60)),
  },
  "Narrative bias lenses",
  { required: [] }
);