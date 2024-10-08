import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <h1>Smart Wardrobe Assistant</h1>
      <p>Your personal outfit recommender based on weather, occasion, and your style!</p>
      <div className="buttons">
        <Link to="/login" className="button">Login</Link>
        <Link to="/signup" className="button">Sign Up</Link>
      </div>
    </div>
  );
};

export default LandingPage;
