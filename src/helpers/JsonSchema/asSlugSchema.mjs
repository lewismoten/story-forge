import { asStringSchema } from "./asStringSchema.mjs";

export const asSlugSchema = (minLength, maxLength, description, options = {}) => 
  asStringSchema(minLength, maxLength, description, {...options, pattern: '^[a-z0-9\\-]+$'});
