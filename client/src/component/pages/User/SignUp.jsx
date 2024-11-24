import React, { useState } from 'react';
import './Sign.css';
import axios from 'axios';

function SignUp() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    if (formData.password === formData.confirmPassword) {
      try {
        // Exclude confirmPassword field from the payload
        const { confirmPassword, ...dataToSend } = formData;

        //  console.log("Payload being sent:", dataToSend);

        // Send the API request
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/sign-up`,
          dataToSend
        );

        if (response.data.success) {
          alert('User created successfully!');
        } else {
          alert(`Failed: ${response.data.msg}`);
        }
      } catch (error) {
        // Check if error contains a response and a message
        if (error.response && error.response.data && error.response.data.msg) {
          alert(`Error: ${error.response.data.msg}`);
        } else {
          alert("An unexpected error occurred. Please try again.");
        }
        // console.error("Error occurred:", error);
      }
    } else {
      alert("Password does not match Confirm Password.");
    }
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="center-container">
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="fName">First Name</label>
        <input
          type="text"
          name="fName"
          id="fName"
          placeholder="Enter your first name"
          onChange={handleChange}
          value={formData.fName}
        />

        <label htmlFor="lName">Last Name</label>
        <input
          type="text"
          name="lName"
          id="lName"
          placeholder="Enter your last name"
          onChange={handleChange}
          value={formData.lName}
        />

        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Enter your email"
          onChange={handleChange}
          value={formData.email}
        />

        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password"
          onChange={handleChange}
          value={formData.password}
        />

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          type="password"
          name="confirmPassword"
          id="confirmPassword"
          placeholder="Confirm your password"
          onChange={handleChange}
          value={formData.confirmPassword}
        />

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default SignUp;
