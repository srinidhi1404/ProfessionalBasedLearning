// Validation.js
export function validateForm(formData, validationRules) {
    const errors = {};
  
    for (const field in validationRules) {
      const rules = validationRules[field];
      for (const rule of rules) {
        if (rule.required && !formData[field]) {
          errors[field] = `${field} is required`;
          break;
        }
        if (rule.pattern && !rule.pattern.test(formData[field])) {
          errors[field] = rule.errorMessage;
          break;
        }
      }
    }
  
    return errors;
  }
  