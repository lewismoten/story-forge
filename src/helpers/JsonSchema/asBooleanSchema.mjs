export const asBooleanSchema = (description, options = {}) => {
  let o = { type: 'boolean', ...options };
  if(typeof description === 'string' && description.trim().length !== 0) 
    o.description = description.trim();
  return o;
}
