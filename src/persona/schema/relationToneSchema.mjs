import { asEnumSchema } from "../../helpers/JsonSchema/asEnumSchema.mjs";

export const relationToneSchema = asEnumSchema(['warm', 'neutral', 'tense', 'hostile', 'devoted']);
