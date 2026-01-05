import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const backgroundSchema = asObjectSchema(
  {
    summary: asStringSchema(0, 1200, "Short bio/backstory"),
    beats: asArraySchema(0, 10, true, asStringSchema(1, 160), "Key life beats"),
  },
  "Background and history",
  { required: [] }
);