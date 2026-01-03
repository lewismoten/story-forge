import process from "node:process";
export const DEEPAI_API_CONCURRENCY = Number(process.env.DEEPAI_API_CONCURRENCY || 2);
