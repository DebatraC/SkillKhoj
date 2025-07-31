import React from 'react';
// import './Card.css';

const Card = ({ children, title, className = '', onClick }) => {
  return (
    <div className={`card ${className}`} onClick={onClick}>
      {title && <div className="card-header">{title}</div>}
      <div className="card-content">
        {children}
      </div>
    </div>
  );
};

export default Card;