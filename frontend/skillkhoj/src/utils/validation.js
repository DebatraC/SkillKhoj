/**
 * Form validation utilities
 */

export const validators = {
  required: (value) => {
    if (!value || (typeof value === 'string' && !value.trim())) {
      return 'This field is required';
    }
    return null;
  },

  email: (value) => {
    if (!value) return null;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value) ? null : 'Please enter a valid email address';
  },

  minLength: (min) => (value) => {
    if (!value) return null;
    return value.length >= min ? null : `Must be at least ${min} characters long`;
  },

  maxLength: (max) => (value) => {
    if (!value) return null;
    return value.length <= max ? null : `Must be no more than ${max} characters long`;
  },

  password: (value) => {
    if (!value) return null;
    
    const errors = [];
    if (value.length < 8) errors.push('at least 8 characters');
    if (!/(?=.*[a-z])/.test(value)) errors.push('one lowercase letter');
    if (!/(?=.*[A-Z])/.test(value)) errors.push('one uppercase letter');
    if (!/(?=.*\d)/.test(value)) errors.push('one number');
    
    return errors.length > 0 
      ? `Password must contain ${errors.join(', ')}`
      : null;
  },

  confirmPassword: (originalPassword) => (value) => {
    if (!value) return null;
    return value === originalPassword ? null : 'Passwords do not match';
  },

  url: (value) => {
    if (!value) return null;
    try {
      new URL(value);
      return null;
    } catch {
      return 'Please enter a valid URL';
    }
  },

  phone: (value) => {
    if (!value) return null;
    const phoneRegex = /^\+?[\d\s\-\(\)]{10,}$/;
    return phoneRegex.test(value) ? null : 'Please enter a valid phone number';
  },

  number: (value) => {
    if (!value) return null;
    return !isNaN(value) ? null : 'Please enter a valid number';
  },

  positiveNumber: (value) => {
    if (!value) return null;
    const num = parseFloat(value);
    return (!isNaN(num) && num > 0) ? null : 'Please enter a positive number';
  }
};

/**
 * Validate a form object against validation rules
 */
export const validateForm = (formData, validationRules) => {
  const errors = {};
  
  Object.keys(validationRules).forEach(field => {
    const fieldValidators = validationRules[field];
    const value = formData[field];
    
    for (const validator of fieldValidators) {
      const error = validator(value);
      if (error) {
        errors[field] = error;
        break; // Stop at first error for this field
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Example validation rules for common forms
 */
export const validationRules = {
  login: {
    email: [validators.required, validators.email],
    password: [validators.required]
  },

  register: {
    firstName: [validators.required],
    lastName: [validators.required],
    email: [validators.required, validators.email],
    password: [validators.required, validators.password],
    confirmPassword: [validators.required] // Note: confirmPassword validator needs special handling
  },

  profile: {
    firstName: [validators.required],
    lastName: [validators.required],
    email: [validators.required, validators.email],
    bio: [validators.maxLength(500)],
    website: [validators.url],
    phone: [validators.phone]
  },

  course: {
    title: [validators.required, validators.maxLength(100)],
    description: [validators.required, validators.maxLength(1000)],
    price: [validators.required, validators.positiveNumber]
  }
};