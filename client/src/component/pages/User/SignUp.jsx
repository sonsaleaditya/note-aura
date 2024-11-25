import React, { useState } from 'react';
import './Sign.css';
import axios from 'axios';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

function SignUp() {
  const [formData, setFormData] = useState({
    fName: "",
    lName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate(); // Initialize navigate hook

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page

    if (formData.password === formData.confirmPassword) {
      try {
        // Exclude confirmPassword field from the payload
        const { confirmPassword, ...dataToSend } = formData;

        // Send the API request
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/user/sign-up`,
          dataToSend
        );

        if (response.data.success) {
          // Success Toast
          toast.success("🎉 User created successfully!", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            transition: Slide,
            style: {
              backgroundColor: "#28a745", // Green background
              color: "#fff", // White text
              fontWeight: "bold",
              borderRadius: "8px",
              textAlign: "center",
            },
          });

          // Redirect to the sign-in page after successful signup
          setTimeout(() => {
            navigate('/sign-in');
          }, 3000); // Redirect after 3 seconds (to allow the toast to be visible)
        } else {
          // Error Toast
          toast.error(`❌ Failed: ${response.data.msg}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            transition: Slide,
            style: {
              backgroundColor: "#dc3545", // Red background
              color: "#fff", // White text
              fontWeight: "bold",
              borderRadius: "8px",
              textAlign: "center",
            },
          });
        }
      } catch (error) {
        // Handle unexpected errors
        if (error.response && error.response.data && error.response.data.msg) {
          toast.error(`❌ Error: ${error.response.data.msg}`, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            transition: Slide,
            style: {
              backgroundColor: "#dc3545", // Red background
              color: "#fff", // White text
              fontWeight: "bold",
              borderRadius: "8px",
              textAlign: "center",
            },
          });
        } else {
          toast.error("❌ An unexpected error occurred. Please try again.", {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            transition: Slide,
            style: {
              backgroundColor: "#dc3545", // Red background
              color: "#fff", // White text
              fontWeight: "bold",
              borderRadius: "8px",
              textAlign: "center",
            },
          });
        }
      }
    } else {
      toast.error("❌ Password does not match Confirm Password.", {
        position: "top-center",
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        transition: Slide,
        style: {
          backgroundColor: "#dc3545", // Red background
          color: "#fff", // White text
          fontWeight: "bold",
          borderRadius: "8px",
          textAlign: "center",
        },
      });
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
      <h2>Sign Up</h2>
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
      <ToastContainer />
    </div>
  );
}

export default SignUp;
