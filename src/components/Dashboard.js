import React, { useState, useEffect } from 'react';
import { getOutfits } from '../services/outfitService';
import { fetchWeatherData } from '../services/weatherService';
import OutfitForm from './OutfitForm';
import OutfitSuggestion from './OutfitSuggestion';
import './Dashboard.css';
import { auth } from '../firebaseConfig';

// Import the Analytics component
import { Analytics } from "@vercel/analytics/react";
<Analytics/>

const Dashboard = ({ user }) => {
  const [outfits, setOutfits] = useState([]);
  const [weather, setWeather] = useState(null);
  const [suggestedOutfit, setSuggestedOutfit] = useState(null);

  useEffect(() => {
    const fetchUserOutfits = async () => {
      const userOutfits = await getOutfits(user.uid); // Fetch outfits for logged-in user
      setOutfits(userOutfits);
      // Set a default suggested outfit if available
      if (userOutfits.length > 0) setSuggestedOutfit(userOutfits[0]);
    };
    fetchUserOutfits();
  }, [user]);

  const handleFetchWeather = async () => {
    try {
      const currentWeather = await fetchWeatherData();
      setWeather(currentWeather);
      recommendOutfit(currentWeather); // Recommend outfit based on weather
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const recommendOutfit = (currentWeather) => {
    // Logic to suggest an outfit based on the fetched weather
    const recommended = outfits.find(outfit => outfit.weatherType === currentWeather.condition); // Example condition
    setSuggestedOutfit(recommended|| null);
  };

  const handleLogout = async () => {
    try {
      await auth.signOut(); // Sign the user out
      // Optionally redirect to the login page after logout
      window.location.href = '/login'; // Adjust based on your routing setup
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <div className="dashboard">
      <h2>Welcome, {user.email}</h2>

      <button onClick={handleFetchWeather}>Check Weather</button>
      {weather && <p>Current Weather: {weather.description}</p>}

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-button">Logout</button>

      {/* Outfit Form */}
      <div className="add-outfit-section">
        <OutfitForm fetchWeather={handleFetchWeather} />
      </div>

      {/* Suggested Outfit */}
      <div className="outfit-suggestion-section">
        {suggestedOutfit ? (
          <OutfitSuggestion suggestedOutfit={suggestedOutfit} rateOutfit={() => {}} />
        ) : (
          <p>No outfit suggestion available.</p>
        )}
      </div>

      {/* Outfit List */}
      <div className="outfit-list-section">
        <h3>Your Outfits</h3>
        <ul>
          {outfits.map((outfit, index) => (
            <li key={outfit.id}>{outfit.name} - {outfit.weatherType}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
