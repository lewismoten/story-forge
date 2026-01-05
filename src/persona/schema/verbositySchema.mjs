import { asEnumSchema } from "../../helpers/JsonSchema/asEnumSchema.mjs";

export const verbositySchema = asEnumSchema(["spare", "moderate", "lush"]);