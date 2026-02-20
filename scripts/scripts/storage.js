const KEY = 'finance:data';

export const load = () => JSON.parse(localStorage.getItem(KEY) || '[]');
export const save = data => localStorage.setItem(KEY, JSON.stringify(data));

export const init = async () => {
  if (!localStorage.getItem(KEY)) {
    const res = await fetch('../seed.json');  // go up one folder to repo root
    const data = await res.json();
    save(data);
  }
}
