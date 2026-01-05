import { asArraySchema } from "../../../helpers/JsonSchema/asArraySchema.mjs";
import { asNullableNumberSchema } from "../../../helpers/JsonSchema/asNullableNumberSchema.mjs";
import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";
import { ageRangeSchema } from "../ageRangeSchema.mjs";
import { appearanceSchema } from "./appearanceSchema.mjs";
import { locationSchema } from "./locationSchema.mjs";
import { relationshipSchema } from "./relationshipSchema.mjs";
import { backgroundSchema} from './backgroundSchema.mjs';
import {personalitySchema} from './personalitySchema.mjs';

export const personaProfileSchema = asObjectSchema(
  {
    gender: asStringSchema(0, 24),
    age_range: ageRangeSchema,
    age: asNullableNumberSchema(0, 5000, "Exact/approx age, null if unknown"),
    species: asStringSchema(0, 24),
    roles: asArraySchema(0, 6, true, asStringSchema(2, 120), "In-world roles (e.g., archivist, captain, witness)"),
    occupation: asStringSchema(0, 120),
    affiliations: asArraySchema(0, 12, true, asStringSchema(1, 80), "Groups/orgs"),
    home_region: asStringSchema(0, 120),
    locations: asArraySchema(0, 6, true, locationSchema, "Places tied to the persona"),
    aliases: asArraySchema(0, 12, true, asStringSchema(1, 80), "Other names this person goes by"),
    appearance: appearanceSchema,
    personality: personalitySchema,
    skills: asArraySchema(0, 20, true, asStringSchema(1, 40), "Skills/capabilities"),
    equipment: asArraySchema(0, 20, true, asStringSchema(1, 64), "Signature gear"),
    goals: asArraySchema(0, 20, true, asStringSchema(1, 80), "Goals or drives"),
    background: backgroundSchema,
    relationships: asArraySchema(0, 200, false, relationshipSchema, "Relationships to other personas"),
  },
  "Canonical character profile",
  { required: [] }
);