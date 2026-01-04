export const isoIsFuture = iso_string => {
  const d = new Date(iso_string);
  return d.getTime() > Date.now();
}
