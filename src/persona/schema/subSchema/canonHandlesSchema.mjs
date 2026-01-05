import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const canonHandlesSchema = asObjectSchema(
  {
    mention_name: asStringSchema(1, 80, "How others should refer to them in-world"),
    entity_tags: asArraySchema(0, 30, true, asStringSchema(1, 40), "Tags for indexing/search"),
  },
  "Cross-referencing handles",
  { required: ["mention_name"] }
);