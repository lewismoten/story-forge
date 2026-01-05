import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asNullableNumberSchema } from "../../../helpers/JsonSchema/asNullableNumberSchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const timelineAnchorSchema = asObjectSchema(
  {
    era: asStringSchema(1, 80, "e.g., 'Elysia Silence Era' or 'Post-Archive After Tomorrow'"),
    circa_year: asNullableNumberSchema(-9999, 9999, "Approx year, null if timeless/unknown"),
    location_focus: asArraySchema(0, 8, true, asStringSchema(1, 60), "Common setting(s)"),
  },
  "Where this persona sits in the timeline",
  { required: ["era", "location_focus"] }
);