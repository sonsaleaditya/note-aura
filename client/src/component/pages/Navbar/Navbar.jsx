import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the token

function Navbar() {
  const [userInfo, setUserInfo] = useState(null);
  const [isTokenAvailable, setIsTokenAvailable] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsTokenAvailable(true);
      try {
        const decodedToken = jwtDecode(token); // Decode the JWT token
        setUserInfo(decodedToken); // Set the user info (including img)
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []); // Run this effect once when the component mounts

  return (
    <nav className="navbar-container">
      {/* Logo Section */}
      <div className="logo">
        <NavLink to="/home" className="logotext">
          <h1>NoteAura </h1>
        </NavLink>
      </div>

      {/* Navbar Links */}
      <ul className="navbar-items">


        {
          isTokenAvailable && userInfo ? (
            <>
              <NavLink to={isTokenAvailable ? "/home" : "/"} className="logotext">
              </NavLink>
              <li><NavLink to="/create-note">Create Note</NavLink></li>

              <li><NavLink to="/view-notes">View Notes</NavLink></li>
            </>
          ) : null
        }

        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/contact">Contact</NavLink></li>

        {/* Show profile link if token is available */}
        {isTokenAvailable && userInfo ? (
          <li>
            <NavLink to="/profile">
              <img
                src={userInfo.img || 'default-profile.jpg'} // Use img from decoded token or fallback
                alt="User Profile"
                className="profile-img"
              />
            </NavLink>
          </li>
        ) : null}
      </ul>
    </nav>
  );
}

export default Navbar;
