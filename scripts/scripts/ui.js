import { records, updateRecords, sortRecords } from './state.js';
import { highlight, filterRecords, compileRegex } from './search.js';

const tableBody = document.querySelector('#records-body');
const searchInput = document.querySelector('#search');

export const renderTable = (filterPattern='') => {
  tableBody.innerHTML = '';
  let data = filterRecords(records, filterPattern);
  data.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${highlight(r.description, compileRegex(filterPattern))}</td>
      <td>${r.amount.toFixed(2)}</td>
      <td>${r.category}</td>
      <td>${r.date}</td>
    `;
    tableBody.appendChild(tr);
  });
};

document.querySelectorAll('.sort-btn').forEach(btn=>{
  btn.addEventListener('click', e=>{
    const field = e.target.dataset.field;
    const asc = e.target.dataset.asc==='true';
    sortRecords(field, asc);
    renderTable(searchInput.value);
  });
});

searchInput.addEventListener('input', e=>{
  renderTable(e.target.value);
});
