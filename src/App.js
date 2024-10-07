import React, { useState } from 'react';
import OutfitForm from './components/OutfitForm';
import OutfitSuggestion from './components/OutfitSuggestion';
import './App.css';

function App() {
  const [outfits, setOutfits] = useState([]);
  const [suggestedOutfit, setSuggestedOutfit] = useState(null);

  const addOutfit = (newOutfit) => {
    setOutfits([...outfits, newOutfit]);
  };

  const getOutfitSuggestion = () => {
    if (outfits.length === 0) return;
    
    // For now, let's just randomly suggest an outfit
    const randomOutfit = outfits[Math.floor(Math.random() * outfits.length)];
    setSuggestedOutfit(randomOutfit);
  };

  return (
    <div className="App">
      <h1>AI Wardrobe Assistant Lite</h1>
      <OutfitForm addOutfit={addOutfit} />
      <button onClick={getOutfitSuggestion}>Get Outfit Suggestion</button>
      {suggestedOutfit && <OutfitSuggestion outfit={suggestedOutfit} />}
    </div>
  );
}

export default App;
