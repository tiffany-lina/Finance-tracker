import { load, save } from './storage.js';

export let records = load();

export const updateRecords = (newRecords) => {
  records = newRecords;
  save(records);
};

export const sortRecords = (field, asc=true) => {
  records.sort((a,b)=>{
    if(field==='description') return asc ? a.description.localeCompare(b.description) : b.description.localeCompare(a.description);
    if(field==='amount') return asc ? a.amount - b.amount : b.amount - a.amount;
    if(field==='date') return asc ? new Date(a.date) - new Date(b.date) : new Date(b.date) - new Date(a.date);
    return 0;
  });
};
