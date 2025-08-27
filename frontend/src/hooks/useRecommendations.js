// useRecommendations.js

import { useState } from 'react';
import recommendationService from '../services/recommendation.service';

function useRecommendations(products) {
  const [recommendations, setRecommendations] = useState([]);

  const getRecommendations = (formData) => {
    const recs = recommendationService.getRecommendations(formData, products);
    console.log('Recomendações geradas:', recs);
    setRecommendations(recs);
    return recs;
  };

  return { recommendations, getRecommendations, setRecommendations };
}

export default useRecommendations;
