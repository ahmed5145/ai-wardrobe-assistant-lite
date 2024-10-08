import React from 'react';

const OutfitSuggestion = ({ suggestedOutfit, rateOutfit, outfitRatings }) => {
  return (
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
  );
};

export default OutfitSuggestion;
