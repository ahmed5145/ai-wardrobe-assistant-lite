import React, { useState } from 'react';
import axios from 'axios';
import { auth, db } from './firebaseConfig';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { setDoc, doc } from 'firebase/firestore';

// Add your existing outfits data here or fetch from an API
const outfits = [
  { id: '1', item: 'Raincoat', occasion: 'casual' },
  { id: '2', item: 'T-shirt', occasion: 'casual' },
  { id: '3', item: 'Jacket', occasion: 'formal' },
  // Add more outfits
];

const App = () => {
  const [weather, setWeather] = useState(null);
  const [suggestedOutfit, setSuggestedOutfit] = useState(null);
  const [outfitRatings, setOutfitRatings] = useState({});
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const fetchWeather = async (city) => {
    try {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.REACT_APP_OPENWEATHERMAP_API_KEY}`
      );
      console.log('Weather Data:', response.data);
      setWeather(response.data);
      getOutfitSuggestion(response.data);
    } catch (error) {
      console.error('Error fetching weather data:', error.message);
    }
  };

  const getOutfitSuggestion = () => {
    if (outfits.length === 0 || !weather) return;
  
    const temperature = weather.main.temp;
    const weatherCondition = weather.weather[0].main.toLowerCase();
    const windSpeed = weather.wind.speed; // Wind speed in meters/sec
    const humidity = weather.main.humidity; // Humidity percentage
    const month = new Date().getMonth() + 1; // Get current month (1-12)
  
    let filteredOutfits = outfits;
  
    // Handle extreme weather conditions
    if (weatherCondition.includes('rain') || weatherCondition.includes('drizzle')) {
      filteredOutfits = outfits.filter((outfit) => outfit.item.includes('raincoat') || outfit.item.includes('jacket'));
    } else if (weatherCondition.includes('snow')) {
      filteredOutfits = outfits.filter((outfit) => outfit.item.includes('coat'));
    } else if (windSpeed > 20) {
      // Windy weather
      filteredOutfits = outfits.filter((outfit) => outfit.item.includes('windbreaker') || outfit.item.includes('jacket'));
    } else if (humidity > 80) {
      // High humidity (suggest light outfits)
      filteredOutfits = outfits.filter((outfit) => outfit.item.includes('t-shirt') || outfit.item.includes('shorts'));
    }
  
    // Temperature-based suggestions
    if (temperature < 10) {
      filteredOutfits = outfits.filter((outfit) => outfit.item.includes('sweater') || outfit.item.includes('jacket'));
    } else if (temperature >= 10 && temperature < 20) {
      filteredOutfits = outfits.filter((outfit) => outfit.occasion === 'formal');
    } else if (temperature >= 20) {
      filteredOutfits = outfits.filter((outfit) => outfit.item.includes('t-shirt') || outfit.item.includes('shorts'));
    }
  
    // Add seasonal adjustments (Winter/Summer clothing)
    if (month >= 12 || month <= 2) {
      // Winter months: December - February
      filteredOutfits = outfits.filter((outfit) => outfit.item.includes('coat') || outfit.item.includes('scarf'));
    } else if (month >= 6 && month <= 8) {
      // Summer months: June - August
      filteredOutfits = outfits.filter((outfit) => outfit.item.includes('t-shirt') || outfit.item.includes('shorts'));
    }
  
    if (filteredOutfits.length === 0) {
      setSuggestedOutfit('No suitable outfits available');
    } else {
      const randomOutfit = filteredOutfits[Math.floor(Math.random() * filteredOutfits.length)];
      setSuggestedOutfit(randomOutfit);
    }
  };
  

  const rateOutfit = (outfitId, rating) => {
    setOutfitRatings((prevRatings) => ({
      ...prevRatings,
      [outfitId]: rating,
    }));
    saveOutfitRating(outfitId, rating);
  };

  const saveOutfitRating = async (outfitId, rating) => {
    const userId = auth.currentUser.uid;
    await setDoc(doc(db, "users", userId), {
      [outfitId]: rating,
    }, { merge: true });
  };

  const loginUser = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('User logged in');
    } catch (error) {
      console.error('Login Error:', error.message);
    }
  };

  return (
    <div>
      <h1>Smart Wardrobe Assistant</h1>
      <input
        type="text"
        placeholder="Enter city"
        onKeyDown={(e) => e.key === 'Enter' && fetchWeather(e.target.value)}
      />
      <div>
        <h2>Suggested Outfit: {suggestedOutfit ? suggestedOutfit.item : 'Loading...'}</h2>
        {suggestedOutfit && (
          <div>
            <span>Rate this outfit: </span>
            {[1, 2, 3, 4, 5].map((num) => (
              <button key={num} onClick={() => rateOutfit(suggestedOutfit.id, num)}>
                {num}
              </button>
            ))}
            <p>Current Rating: {outfitRatings[suggestedOutfit.id] || 'Not Rated'}</p>
          </div>
        )}
      </div>
      <div>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={loginUser}>Login</button>
      </div>
    </div>
  );
};

export default App;
