import React, { useState } from 'react';
import axios from 'axios';
import './Contact.css';

function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !message) {
      alert('Please fill in all the fields!');
      return;
    }

    setLoading(true);

    const formData = {
      fName: name,
      email: email,
      msg: message,
    };

    try {
      // Make the POST request to the API
      const response = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/contact-us/insert-review`, 
        formData
      );

      if (response.data.success) {
        alert('Your message has been successfully submitted!');
        // Clear form fields
        setName('');
        setEmail('');
        setMessage('');
      } else {
        alert('There was an issue submitting your message. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting the form:', error);
      alert('There was an error submitting your message. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="contact-wrapper">
      <div className="contact-card">
        <h2>Contact Us</h2>
        <p className="contact-description">
          We would love to hear from you! Please fill out the form below, and we will get back to you as soon as possible.
        </p>
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Enter your message"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" className="btn-submit" disabled={loading}>
            {loading ? 'Sending...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
