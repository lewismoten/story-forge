import { asEnumSchema } from "../../helpers/JsonSchema/asEnumSchema.mjs";

export const liePermissionSchema = asEnumSchema(['none', 'rumors', 'yes']);