import React, { useEffect, useState } from 'react';
import './Sign.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode';  // Default import



 // Import jwt-decode to decode the token

function SignIn() {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  
  //import jwtDecode from 'jwt-decode';  // Default import

function handleSubmit(e) {
  e.preventDefault();
  axios.post(`${import.meta.env.VITE_API_BASE_URL}/user/sign-in`, form)
    .then(res => {
      if (res.data.succes) {
        const { token } = res.data;

        // Store the token in localStorage
        localStorage.setItem("authToken", token);

        // Decode the token to extract user info
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);

        // Check if the token has expired
        const currentTime = Date.now() / 1000;  // Current time in seconds
        if (decodedToken.exp < currentTime) {
          alert("Token expired. Please log in again.");
          localStorage.removeItem("authToken");
          navigate("/sign-in");  // Redirect to sign-in page
        } else {
          alert("User signed in successfully!");
          navigate("/home");  // Redirect to home page
        }
      } else {
        alert(res.data.msg);
      }
    })
    .catch(error => {
      alert("An error occurred while signing in.");
    });
}


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

useEffect(()=>{

},[])

return (
  <div className="center-container">
    <form className="form" onSubmit={handleSubmit}>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        name="email"
        id="email"
        value={form.email}
        placeholder="Enter email"
        onChange={handleChange}
      />

      <label htmlFor="password">Password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={form.password}
        placeholder="Enter password"
        onChange={handleChange}
      />

      <button type="submit">Sign In</button>
    </form>
  </div>
);
}



export default SignIn;
