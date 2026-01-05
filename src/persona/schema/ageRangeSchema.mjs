import { asEnumSchema } from "../../helpers/JsonSchema/asEnumSchema.mjs";

export const ageRangeSchema = asEnumSchema(['child', 'teen', 'adult', 'elder', 'unknown']);
