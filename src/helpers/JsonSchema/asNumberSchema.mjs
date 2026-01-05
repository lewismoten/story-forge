export const asNumberSchema = (minimum, maximum, description, options = {}) => {
  const o = { type: 'number', ...options };
  if(typeof minimum === 'number') o.minimum = minimum;
  if(typeof maximum === 'number') o.maximum = maximum;
  if(typeof description === 'string' && description.trim().length !== 0) 
    o.description = description.trim();
  return o;
}
