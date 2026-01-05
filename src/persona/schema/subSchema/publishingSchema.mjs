import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asEnumSchema } from "../../../helpers/JsonSchema/asEnumSchema.mjs";
import { asNullableNumberSchema } from "../../../helpers/JsonSchema/asNullableNumberSchema.mjs";
import { asNumberSchema } from "../../../helpers/JsonSchema/asNumberSchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";
import { cadenceSchema } from "../cadenceSchema.mjs";

export const publishingSchema = asObjectSchema(
  {
    cadence: cadenceSchema,
    post_interval_days: asObjectSchema(
      {
        min: asNumberSchema(0, 365, "Minimum days between posts (0 = can post same day)"),
        max: asNumberSchema(0, 365, "Maximum days between posts"),
        max_per_year: asNumberSchema(0, 365 * 24, "Upper bound; you can tighten later"),
        jitter_strategy: asEnumSchema(["uniform", "weighted_recent", "bursty", "calm"]),
        burst_chance: asNullableNumberSchema(0, 1, "Burst chance if bursty"),
      },
      "Post spacing rules",
      { required: ["min", "max"] }
    ),
    timezone: asStringSchema(0, 60, "IANA tz, optional (e.g., America/New_York)"),

    // Optional preference “nudges”
    preferred_tags: asArraySchema(0, 20, true, asStringSchema(1, 24)),
    publishing_platforms: asArraySchema(0, 6, true, asStringSchema(1, 24)),

    preferred_post: asObjectSchema(
      {
        holidays: asArraySchema(0, 24, true, asStringSchema(1, 55), "Holiday names"),
        weeks: asArraySchema(0, 55, true, asNumberSchema(1, 55), "Week number of year where 1 = first week"),
        months: asArraySchema(0, 12, true, asNumberSchema(1, 12), "Month where 1 = January"),
        // Choose ONE convention: I recommend 1–7 with 1=Monday (ISO), but keep yours if you want.
        days: asArraySchema(0, 7, true, asNumberSchema(1, 7), "Day of week where 1 = Sunday"),
        hours: asArraySchema(0, 24, true, asNumberSchema(0, 23), "Hour of day"),
      },
      "Optional scheduling preferences",
      { required: [] }
    ),
  },
  "Publishing behavior",
  { required: ["cadence", "post_interval_days"] }
);