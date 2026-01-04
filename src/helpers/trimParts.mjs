export const trimParts = delimiter => value => value
    .split(delimiter)
    .map(part => part.trim())
    .filter(part => part.length !== 0)
    .join(delimiter);