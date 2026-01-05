import { asNullableNumberSchema } from "../../../helpers/JsonSchema/asNullableNumberSchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const appearanceSchema = asObjectSchema(
  {
    height_cm: asNullableNumberSchema(1, 3048, "Height in cm, null if unknown"),
    build: asStringSchema(0, 40),
    hair_color: asStringSchema(0, 40),
    eye_color: asStringSchema(0, 40),
    skin_tone: asStringSchema(0, 40),
    notable_features: asStringSchema(0, 240),
  },
  "Physical description",
  { required: [] }
);