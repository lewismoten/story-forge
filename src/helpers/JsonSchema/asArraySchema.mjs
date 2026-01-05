export const asArraySchema = (minItems, maxItems, uniqueItems, items) => {
  const o = { type: 'array', items };
  if(typeof minItems === 'number') o.minItems = minItems;
  if(typeof maxItems === 'number') o.maxItems = maxItems;
  if(typeof uniqueItems === 'boolean') o.uniqueItems = uniqueItems;
  return o;
}