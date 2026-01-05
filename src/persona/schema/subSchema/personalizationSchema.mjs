import { asObjectSchema } from "../../../helpers/JsonSchema/asObjectSchema.mjs";
import { asStringSchema } from "../../../helpers/JsonSchema/asStringSchema.mjs";

export const personalizationSchema = asObjectSchema(
  {
    // This is “account identity” / blog-facing
    first_name: asStringSchema(1, 20),
    last_name: asStringSchema(1, 60),
    preferred_name: asStringSchema(0, 80),
    user_name: asStringSchema(3, 32, "Username used for accounts", { pattern: "^[a-z0-9_\\-\\.]+$" }),
    bio: asStringSchema(10, 320, "Public bio (~5-40 words). Keep punchy and in-world."),
    avatar_name: asStringSchema(1, 80, "Display name shown publicly on the blog/social profiles"),
    avatar_description: asStringSchema(30, 700, "Avatar profile image description (~10-100 words). No camera jargon required."),
  },
  "Public-facing identity for posting accounts",
  { required: ["first_name", "last_name", "user_name", "bio", "avatar_name", "avatar_description"] }
);