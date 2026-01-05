import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { canonConfidenceSchema } from "../canonConfidenceSchema.mjs";
import { citationStyleSchema } from "../citationStyleSchema.mjs";
import { liePermissionSchema } from "../liePermissionSchema.mjs";

export const canonPolicySchema = asObjectSchema(
  {
    lie_permission: liePermissionSchema,
    citation_style: citationStyleSchema,
    canon_confidence_default: canonConfidenceSchema,
  },
  "Canon and truth policy",
  { required: ["lie_permission", "citation_style", "canon_confidence_default"] }
);