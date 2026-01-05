import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asEnumSchema } from "../../../helpers/JsonSchema/asEnumSchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const contentControlsSchema = asObjectSchema(
  {
    excerpt_strategy: asEnumSchema(["emotion", "question", "theme", "worldbuilding", "contradict", "fragment", "rules"]),
    excerpt_avoid_terms: asArraySchema(0, 25, true, asStringSchema(1, 40)),
    intro_avoid_phrases: asArraySchema(0, 10, true, asStringSchema(1, 60)),
  },
  "Front-page / excerpt controls",
  { required: [] }
);