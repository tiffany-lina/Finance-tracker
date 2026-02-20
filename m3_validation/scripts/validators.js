export const rules = {
  description: /^\S(?:.*\S)?$/,
  numeric: /^(0|[1-9]\d*)(\.\d{1,2})?$/,
  date: /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/,
  category: /^[A-Za-z]+(?:[ -][A-Za-z]+)*$/,
  noDuplicateWords: /\b(\w+)\s+\1\b/
};

export function validate(field, value) {
  switch(field) {
    case 'description':
      return rules.description.test(value) && !rules.noDuplicateWords.test(value);
    case 'numeric':
      return rules.numeric.test(value);
    case 'date':
      return rules.date.test(value);
    case 'category':
      return rules.category.test(value);
    default:
      return false;
  }
}
