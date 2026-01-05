import { asBooleanSchema } from "../../../helpers/JsonSchema/asBooleanSchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";
import { authorIdSchema } from "../authorIdSchema.mjs";
import { relationSchema } from "../realationSchema.mjs";
import { relationToneSchema } from "../relationToneSchema.mjs";

export const relationshipSchema = asObjectSchema(
  {
    to_id: authorIdSchema,
    relation: relationSchema,
    tone: relationToneSchema,
    public: asBooleanSchema("Whether the relationship is publicly known"),
    note: asStringSchema(0, 240, "Optional relationship note"),
  },
  "Relationship to another persona",
  { required: ["to_id", "relation"] }
);