import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';

function Profile() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get token from localStorage
    const token = localStorage.getItem('authToken');

    // Check if token is available and not expired
    if (token) {
      try {
        // Decode token to get user data (use jwt-decode)
        const decodedToken = JSON.parse(atob(token.split('.')[1]));
        setUser(decodedToken); // Store decoded token (user info)
      } catch (error) {
        console.error('Error decoding the token:', error);
      }
    } else {
      navigate('/sign-in'); // If no token, redirect to sign-in
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove token and navigate to sign-in
    localStorage.removeItem('authToken');
    navigate('/sign-in');
  };

  return (
    <div className="profile-container">
      {user ? (
        <div className="profile-info">
          <div className="profile-header">
            <img
              src={user.img || 'default-profile.jpg'}
              alt="User Profile"
              className="profile-image"
            />
            <h2>{user.fName} {user.lName}</h2>
            <p>{user.email}</p>
          </div>

          <div className="profile-details">
            <h3>User Info</h3>
            <p><strong>ID:</strong> {user.id}</p>
            <p><strong>Email:</strong> {user.email}</p>
            <p><strong>Role:</strong> {user.role}</p>
          </div>

          <button onClick={handleLogout} className="logout-button">Logout</button>
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
}

export default Profile;
