export const sortKeys = obj =>
  Object.fromEntries(
    Object.entries(obj)
      .sort((a, b) => a[0].localeCompare(b[0]))
  );