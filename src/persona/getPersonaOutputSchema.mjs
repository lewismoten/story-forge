import { asStringSchema } from "../helpers/JsonSchema/asStringSchema.mjs";
import { asObjectSchema } from "../helpers/JsonSchema/asObjectSchema.mjs";
import { asIsoDateSchema } from "../helpers/JsonSchema/asIsoDateSchema.mjs";
import { asSlugSchema } from '../helpers/JsonSchema/asSlugSchema.mjs';
import { authorIdSchema } from "./schema/authorIdSchema.mjs";
import { personalizationSchema } from "./schema/subSchema/personalizationSchema.mjs";
import { personaProfileSchema } from "./schema/subSchema/personaProfileSchema.mjs";
import { voiceSchema } from "./schema/subSchema/voiceSchema.mjs";
import { timelineAnchorSchema } from "./schema/subSchema/timelineAnchorSchema.mjs";
import { knowledgeAccessSchema } from "./schema/subSchema/knowledgeAccessSchema.mjs";
import { instructionsSchema } from "./schema/subSchema/instructionsSchema.mjs";
import { canonPolicySchema } from "./schema/subSchema/canonPolicySchema.mjs";
import { canonHandlesSchema } from "./schema/subSchema/canonHandlesSchema.mjs";
import { crossPersonaSchema } from "./schema/subSchema/crossPersonaSchema.mjs";
import { publishingSchema } from "./schema/subSchema/publishingSchema.mjs";
import { contentControlsSchema } from "./schema/subSchema/contentControlsSchema.mjs";
import { metaSchema } from "./schema/subSchema/metaSchema.mjs";

export const getPersonaOutputSchema = () => {
  const schema = {
    type: "json_schema",
    name: "persona_output",
    schema: asObjectSchema({
      // Identity / indexing
      version: asStringSchema(1, 20, "Schema version, e.g. 1.0"),
      id: authorIdSchema,
      public_id: asSlugSchema(8, 64, "Stable public handle used in URLs/mentions"),
      created_at: asIsoDateSchema(),
      name: asSlugSchema(3, 80, "Persona slug used as a base file name"),

      // Public account identity (blog-facing)
      personalization: personalizationSchema,

      // Canonical character facts (in-world)
      profile: personaProfileSchema,

      // Writing behavior controls
      voice: voiceSchema,
      timeline_anchor: timelineAnchorSchema,
      knowledge_access: knowledgeAccessSchema,
      instructions: instructionsSchema,

      // Canon + collaboration
      canon_policy: canonPolicySchema,
      canon_handles: canonHandlesSchema,
      crossPersona: crossPersonaSchema,

      // Publishing + front page controls
      publishing: publishingSchema,
      content_controls: contentControlsSchema,

      // Non-canon developer notes
      meta: metaSchema,
    }, "Persona output schema", {
      required: [
        "version",
        "id",
        "public_id",
        "created_at",
        "name",
        "personalization",
        "profile",
        "voice",
        "timeline_anchor",
        "knowledge_access",
        "instructions",
        "canon_policy",
        "canon_handles",
        "crossPersona",
        "publishing",
      ],
    }),
  };

  return schema;
}
