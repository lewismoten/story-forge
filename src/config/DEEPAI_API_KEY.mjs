import process from "node:process";

export const DEEPAI_API_KEY = process.env.DEEPAI_API_KEY;

if (!DEEPAI_API_KEY) {
  console.error("Missing env var: DEEPAI_API_KEY");
  process.exit(1);
}