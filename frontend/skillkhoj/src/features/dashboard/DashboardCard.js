import React from 'react';
import { Card } from '../../components';

const DashboardCard = ({ title, value, icon, color = 'blue', onClick }) => {
  return (
    <Card 
      className={`dashboard-card dashboard-card-${color}`}
      onClick={onClick}
    >
      <div className="dashboard-card-content">
        <div className="dashboard-card-icon">{icon}</div>
        <div className="dashboard-card-info">
          <h3 className="dashboard-card-value">{value}</h3>
          <p className="dashboard-card-title">{title}</p>
        </div>
      </div>
    </Card>
  );
};

export default DashboardCard;