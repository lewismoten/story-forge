export const parseArgs = argv => {
  // "1 2 --a 3 --b 4 5 6" becomes {_: [1, 2, 5, 6], a:3, b:4}
  const out = { _: [] };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (isName(a)) {
      const key = a.slice(2);
      const next = argv[i + 1];
      if (!next || isName(next)) out[key] = true;
      else { out[key] = next; i++; }
    } else out._.push(a);
  }
  return out;
}
const isName = part => part.startsWith("--");