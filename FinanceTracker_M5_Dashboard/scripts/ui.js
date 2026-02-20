import { records, filterRecords } from './state.js';
import { compileRegex, highlight } from './search.js';

const tableBody = document.querySelector('#table-body');

// Compute Dashboard Stats
export const computeStats = () => {
  const totalRecords = records.length;
  const totalAmount = records.reduce((sum,r)=>sum+r.amount,0);

  // Top category
  const categoryCount = {};
  records.forEach(r => categoryCount[r.category] = (categoryCount[r.category]||0)+1 );
  let topCategory = '-';
  let maxCount = 0;
  for(const cat in categoryCount){
    if(categoryCount[cat] > maxCount){
      topCategory = cat;
      maxCount = categoryCount[cat];
    }
  }

  // Cap logic
  const capInput = document.querySelector('#cap');
  const cap = parseFloat(capInput.value) || 0;
  const remaining = cap - totalAmount;

  // Update DOM
  document.querySelector('#total-records').textContent = totalRecords;
  document.querySelector('#total-amount').textContent = totalAmount.toFixed(2);
  document.querySelector('#top-category').textContent = topCategory;

  const remEl = document.querySelector('#remaining');
  remEl.textContent = remaining.toFixed(2);
  remEl.setAttribute('role', 'status');
  remEl.setAttribute('aria-live', remaining < 0 ? 'assertive' : 'polite');
};

// Render table with optional regex search
export const renderTable = (filterPattern='') => {
  tableBody.innerHTML = '';
  let data = filterRecords(records, filterPattern);
  const re = compileRegex(filterPattern);
  data.forEach(r=>{
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${highlight(r.description, re)}</td>
      <td>${r.amount.toFixed(2)}</td>
      <td>${r.category}</td>
      <td>${r.date}</td>
    `;
    tableBody.appendChild(tr);
  });
  computeStats();
};

// Live search
document.querySelector('#search').addEventListener('input', e => {
  renderTable(e.target.value);
});

// Recompute stats if cap changes
document.querySelector('#cap').addEventListener('input', computeStats);

// Initial render
renderTable();
