import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const personalitySchema = asObjectSchema(
  {
    traits: asArraySchema(0, 12, true, asStringSchema(1, 24), "Core traits"),
    strengths: asArraySchema(0, 6, true, asStringSchema(1, 40), "Strengths"),
    weaknesses: asArraySchema(0, 6, true, asStringSchema(1, 40), "Weaknesses"),
    likes: asArraySchema(0, 10, true, asStringSchema(1, 40), "Likes"),
    dislikes: asArraySchema(0, 10, true, asStringSchema(1, 40), "Dislikes"),
  },
  "Personality profile",
  { required: [] }
);
