import { asEnumSchema } from "../../helpers/JsonSchema/asEnumSchema.mjs";

export const cadenceSchema = asEnumSchema([
  'weekends',
  'business_days',
  'daily',
  'weekly',
  'monthly',
  'yearly',
  'seasonal',
  'holidays',
  'random'
]);