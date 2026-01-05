import { asEnumSchema } from "../../helpers/JsonSchema/asEnumSchema.mjs";

export const canonConfidenceSchema = asEnumSchema(["low", "medium", "high"]);
