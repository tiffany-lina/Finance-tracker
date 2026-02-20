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
import { saveRecords, loadRecords, saveSettings, loadSettings } from './storage.js';

// --- Export JSON ---
document.querySelector('#export-btn').addEventListener('click', () => {
  const dataStr = JSON.stringify(records, null, 2);
  const blob = new Blob([dataStr], {type: "application/json"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'finance_export.json';
  a.click();
  URL.revokeObjectURL(url);
});

// --- Import JSON ---
document.querySelector('#import-file').addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!Array.isArray(imported)) throw new Error("Invalid format");
      imported.forEach(r => {
        if (!r.id || !r.description || typeof r.amount !== 'number' || !r.category || !r.date) {
          throw new Error("Invalid record structure");
        }
      });
      records = imported;
      saveRecords(records);
      renderTable();
      alert("Import successful!");
    } catch(err) {
      alert("Invalid JSON: " + err.message);
    }
  };
  reader.readAsText(file);
});

// --- Settings ---
const settings = loadSettings();
document.querySelector('#cap-setting').value = settings.cap || 200;
document.querySelector('#currency-setting').value = settings.currency || 'USD';
document.querySelector('#unit-setting').value = settings.unit || 'minutes';

document.querySelector('#save-settings-btn').addEventListener('click', () => {
  const newSettings = {
    cap: parseFloat(document.querySelector('#cap-setting').value),
    currency: document.querySelector('#currency-setting').value,
    unit: document.querySelector('#unit-setting').value
  };
  saveSettings(newSettings);
  alert("Settings saved!");
});
