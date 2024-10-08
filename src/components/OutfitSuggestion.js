import React from 'react';

const OutfitSuggestion = ({ suggestedOutfit }) => {
  if (!suggestedOutfit) {
    return <p>No outfit suggestion available.</p>; // Handle the case where there is no outfit
  }
  return (
    <div className="outfit-suggestion">
      <h3>Suggested Outfit</h3>
      <p>Name: {suggestedOutfit.name}</p>
      <p>Weather Type: {suggestedOutfit.weatherType}</p>
      {/* Add any other outfit properties you want to display */}
    </div>
  );
};

export default OutfitSuggestion;
