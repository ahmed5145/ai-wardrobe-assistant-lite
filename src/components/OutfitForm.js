import React, { useState } from 'react';

const OutfitForm = ({ fetchWeather }) => {
  const [city, setCity] = useState('');

  return (
    <div>
      <input
        type="text"
        value={city}
        placeholder="Enter city"
        onChange={(e) => setCity(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && fetchWeather(city)}
      />
    </div>
  );
};

export default OutfitForm;
