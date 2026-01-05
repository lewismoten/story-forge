export const asObjectSchema = (properties, description, options = {}) => {
  const o = {
    type: 'object',
    additionalProperties: false,
    properties,
    ...options
  };
  if(!o.required) o.required = Object.keys(properties);
  if(o.required.length === 0) delete o.required;
  if(typeof description === 'string' && description.trim().length !== 0)
    o.description = description.trim();
  return o;
}