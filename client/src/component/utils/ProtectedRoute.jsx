import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('authToken');

  if (!token) {
    // Redirect to LandingPage if no token is found
    return <Navigate to="/" replace />;
  }

  return children; // Render the child components if token exists
};

export default ProtectedRoute;
