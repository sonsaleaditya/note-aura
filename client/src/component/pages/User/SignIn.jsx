import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer, Slide } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './toastStyles.css'; // Custom styles for better design (added below)

function SignIn() {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/user/sign-in`,
        form
      );

      if (res.data.success) {
        const { token } = res.data;
        localStorage.setItem('authToken', token); // Store token in localStorage

        // Success Toast Notification
        toast.success('✅ Login successful!', {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          transition: Slide,
          className: 'custom-toast-success',
        });

        setTimeout(() => {
          navigate('/home'); // Navigate to /home after a short delay
          window.location.reload(); // Force a page refresh
        }, 3000);
      } else {
        // Error Toast Notification
        toast.error(`❌ ${res.data.msg || 'Something went wrong'}`, {
          position: 'top-center',
          autoClose: 3000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          transition: Slide,
          className: 'custom-toast-error',
        });
      }
    } catch (error) {
      // Error Toast Notification for server or network errors
      toast.error('❌ Error signing in. Please try again later.', {
        position: 'top-center',
        autoClose: 3000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        transition: Slide,
        className: 'custom-toast-error',
      });
      console.error('Sign-in error:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="center-container">
      <h2>Sign In</h2>
      <form className="form" onSubmit={handleSubmit}>
        <label htmlFor="email">Email</label>
        <input
          type="email"
          name="email"
          value={form.email}
          placeholder="Enter email"
          onChange={handleChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          value={form.password}
          placeholder="Enter password"
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
    </div>
  );
}

export default SignIn;
