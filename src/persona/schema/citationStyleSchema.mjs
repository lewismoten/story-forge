import { asEnumSchema } from "../../helpers/JsonSchema/asEnumSchema.mjs";

export const citationStyleSchema = asEnumSchema(['none', 'vague', 'explicit']);