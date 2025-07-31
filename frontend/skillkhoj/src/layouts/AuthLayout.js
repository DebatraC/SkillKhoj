import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
  return (
    <div className="auth-layout">
      <div className="auth-background">
        <div className="auth-container">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;