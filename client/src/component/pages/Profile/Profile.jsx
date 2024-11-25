import React, { useEffect, useState } from 'react';
import './Profile.css';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify'; // Import toast and ToastContainer for notifications
import 'react-toastify/dist/ReactToastify.css'; // Import toast styles

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
    
    // Show a green toast for successful logout
    toast.success("🎉 Successfully logged out!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      style: {
        backgroundColor: "#28a745", // Green background
        color: "#fff", // White text
        fontWeight: "bold",
        borderRadius: "8px",
        textAlign: "center",
      },
    });

    // Refresh page after logout
    window.location.reload();

    // Navigate to sign-in page
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

      {/* Toast container for displaying toasts */}
      <ToastContainer />
    </div>
  );
}

export default Profile;
