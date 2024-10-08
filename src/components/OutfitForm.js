import React, { useState } from 'react';
import { addOutfit } from '../services/outfitService';

const OutfitForm = ({ fetchWeather }) => {
  const [outfit, setOutfit] = useState('');
  const [description, setDescription] = useState('');
  const [weatherType, setWeatherType] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newOutfit = { name: outfit, description, weatherType };
    if (!outfit || !weatherType) return;

    await addOutfit(newOutfit);
    setOutfit('');
    setWeatherType('');
    setDescription('');
    fetchWeather();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Outfit Name"
        value={outfit}
        onChange={(e) => setOutfit(e.target.value)}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Weather Type (e.g., Rainy, Sunny)"
        value={weatherType}
        onChange={(e) => setWeatherType(e.target.value)}
      />
      <button type="submit">Add Outfit</button>
    </form>
  );
};

export default OutfitForm;
