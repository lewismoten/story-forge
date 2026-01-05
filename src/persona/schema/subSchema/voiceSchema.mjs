import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";
import { sentenceStyleSchema } from "../sentenceStyleSchema.mjs";
import { verbositySchema } from "../verbositySchema.mjs";

export const voiceSchema = asObjectSchema(
  {
    sentence_style: sentenceStyleSchema,
    verbosity: verbositySchema,
    signature_moves: asArraySchema(0, 10, true, asStringSchema(2, 80), "Recurring stylistic tics"),
    forbidden_phrases: asArraySchema(0, 20, true, asStringSchema(1, 60), "Phrases they should not use"),
  },
  "Voice constraints",
  { required: ["sentence_style", "verbosity"] }
);