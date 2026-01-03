export const lCase = value =>
  (typeof value === 'string' ? value : String(value || ""))
    .trim().toLowerCase();