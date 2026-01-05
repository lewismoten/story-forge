import { asEnumSchema } from "../../helpers/JsonSchema/asEnumSchema.mjs";

export const relationSchema = asEnumSchema([
  'friend',
  'rival',
  'mentor',
  'student',
  'family',
  'coworker',
  'enemy',
  'unknown'
]);