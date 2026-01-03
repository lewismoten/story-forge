import { lCase } from "./lCase.mjs";

export const insensitiveUniqueReducer = (values, value) => {
  if (typeof value === 'string') {
    value = value.trim();
  } else {
    value = new String(value | '').trim();
  }
  if (values.includes(value)) return values;
  if (values.map(lCase).includes(lCase(value))) {
    return values;
  }
  return [...values, value];
}