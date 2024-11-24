import React from 'react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.css';

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-container">
      <h1 className="landing-title">Welcome to Your Notes</h1>
      <p className="landing-description">
        Organize your thoughts, track your tasks, and stay on top of everything!
      </p>
      <div className="landing-buttons">
        <button onClick={() => navigate('/sign-in')} className="btn-sign-in">
          Sign In
        </button>
        <button onClick={() => navigate('/sign-up')} className="btn-sign-up">
          SignUp
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
