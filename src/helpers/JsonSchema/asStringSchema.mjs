export const asStringSchema = (
  minLength, 
  maxLength, 
  description, 
  options = {}
) => {
  let o = { type: 'string', ...options };
  if(typeof minLength === 'number') o.minLength = minLength;
  if(typeof maxLength === 'number') o.maxLength = maxLength;
  if(typeof description === 'string' && description.trim().length !== 0) 
    o.description = description.trim();
  return o;
}