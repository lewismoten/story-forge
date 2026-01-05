import { asEnumSchema } from "../../helpers/JsonSchema/asEnumSchema.mjs";

export const sentenceStyleSchema = asEnumSchema(["short", "mixed", "long"]);
