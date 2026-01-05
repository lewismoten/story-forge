import { asNumberSchema } from "./asNumberSchema.mjs";

export const asNullableNumberSchema = (minimum, maximum, description, options = {}) => ({
  oneOf: [
    asNumberSchema(minimum, maximum, description, options),
    { type: "null"}
  ]
});
