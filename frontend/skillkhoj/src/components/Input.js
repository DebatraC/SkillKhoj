import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  type = 'text', 
  placeholder, 
  value, 
  onChange, 
  error, 
  required = false,
  name,
  disabled = false
}) => {
  return (
    <div className="input-group">
      {label && (
        <label className="input-label">
          {label} {required && <span className="required">*</span>}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`input ${error ? 'input-error' : ''}`}
        required={required}
        disabled={disabled}
      />
      {error && <span className="error-message">{error}</span>}
    </div>
  );
};

export default Input;