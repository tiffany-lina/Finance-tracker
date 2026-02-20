import { loadRecords } from './storage.js';

export let records = loadRecords();

export const filterRecords = (data, pattern) => {
  if (!pattern) return data;
  try {
    const re = new RegExp(pattern,'i');
    return data.filter(r => re.test(r.description));
  } catch {
    return data;
  }
};
