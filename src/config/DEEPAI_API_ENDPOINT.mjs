import process from "node:process";

export const DEEPAI_API_ENDPOINT = process.env.DEEPAI_API_ENDPOINT ??
  "https://api.deepai.org/api/text2img";
