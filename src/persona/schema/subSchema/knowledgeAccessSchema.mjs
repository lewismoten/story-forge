import { asBooleanSchema } from "../../../helpers/JsonSchema/asBooleanSchema.mjs";
import { asEnumSchema } from "../../../helpers/JsonSchema/asEnumSchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";

export const knowledgeAccessSchema = asObjectSchema(
  {
    access_level: asEnumSchema(["local", "regional", "archival", "classified", "mythic"]),
    can_reference_other_writers: asBooleanSchema(),
    can_invent_new_entities: asEnumSchema(["none", "minor_only", "one_major_per_writing", "free"]),
  },
  "Knowledge limitations and permissions",
  { required: ["access_level", "can_reference_other_writers", "can_invent_new_entities"] }
);