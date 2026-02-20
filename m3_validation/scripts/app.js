import { validate } from './validators.js';

const form = document.getElementById('recordForm');

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  [...form.elements].forEach(el => {
    if (el.tagName === 'INPUT') {
      const errorSpan = el.nextElementSibling;
      if (!validate(el.name, el.value)) {
        valid = false;
        errorSpan.textContent = `Invalid ${el.name}`;
        el.classList.add('invalid');
      } else {
        errorSpan.textContent = '';
        el.classList.remove('invalid');
      }
    }
  });

  if (valid) {
    alert('All fields valid! 🎉');
    form.reset();
  }
});
