import React from 'react';
import './Alert.css';

const Alert = ({ type = 'info', message, onClose, className = '' }) => {
  return (
    <div className={`alert alert-${type} ${className}`}>
      <span className="alert-message">{message}</span>
      {onClose && (
        <button className="alert-close" onClick={onClose}>×</button>
      )}
    </div>
  );
};

export default Alert;