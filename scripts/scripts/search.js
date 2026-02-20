export const compileRegex = (input, flags='i') => {
  try { return input ? new RegExp(input, flags) : null; }
  catch { return null; }
};

export const highlight = (text, re) => {
  if (!re) return text;
  return text.replace(re, m => `<mark>${m}</mark>`);
};

export const filterRecords = (records, pattern) => {
  const re = compileRegex(pattern);
  if(!re) return records;
  return records.filter(r => re.test(r.description));
};
