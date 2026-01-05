import { asStringSchema } from "../../helpers/JsonSchema/asStringSchema.mjs";

export const authorIdSchema = asStringSchema(8, 64, "Globally unique id of the person");
