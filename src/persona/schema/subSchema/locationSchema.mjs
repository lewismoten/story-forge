import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const locationSchema = asObjectSchema({
  name: asStringSchema(1, 80, "Location name"),
  type: asStringSchema(0, 40, "Type (planet, station, city, ship, region, etc.)"),
  note: asStringSchema(0, 240, "Optional note"),
}, "A location relevant to the character", { required: ["name"] });
