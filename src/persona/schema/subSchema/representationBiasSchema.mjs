import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const representationBiasSchema = asObjectSchema(
  {
    preferred_modalities: asArraySchema(0, 20, true, asStringSchema(2, 60), "Encouraged structures (rules, maps, lists, etc.)"),
    avoid: asArraySchema(0, 20, true, asStringSchema(2, 80), "Things to avoid"),
    notes: asStringSchema(0, 400),
  },
  "Writing-shape biases",
  { required: ["preferred_modalities", "avoid"] }
);