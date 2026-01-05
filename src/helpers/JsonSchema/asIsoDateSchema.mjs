import { asStringSchema } from "./asStringSchema.mjs";

export const asIsoDateSchema = (description = 'ISO Date', options = {}) =>
   asStringSchema(20, 60, description, {
    ...options, 
    format: 'date-time',
    pattern: "^\\d{4}-\\d{2}-\\d{2}T.*(Z|[\\+\\-]\\d{2}:\\d{2})$",
  });