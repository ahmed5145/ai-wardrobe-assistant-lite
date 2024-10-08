import { db } from '../firebaseConfig';
import { collection, addDoc, getDocs } from 'firebase/firestore';

export const addOutfit = async (outfit) => {
  try {
    await addDoc(collection(db, 'outfits'), outfit);
  } catch (error) {
    console.error('Error adding outfit:', error);
  }
};

export const getOutfits = async (userId) => {
  const outfitsCollection = collection(db, 'outfits'); // Get the outfits collection
  const snapshot = await getDocs(outfitsCollection);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })); // Return outfit data
};
