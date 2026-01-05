import { asStringSchema } from "./asStringSchema.mjs";

export const asEnumSchema = (values, description, options = {}) => 
  asStringSchema(null, null, description, {...options, enum: values});