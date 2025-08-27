// getRecommendations.js

// Calcula o score de compatibilidade de um produto com base nas preferências e funcionalidades selecionadas
function getScore(product, selectedPreferences, selectedFeatures) {
  let score = 0;
  if (selectedPreferences && selectedPreferences.length > 0) {
    score += selectedPreferences.filter((pref) =>
      product.preferences.includes(pref)
    ).length;
  }
  if (selectedFeatures && selectedFeatures.length > 0) {
    score += selectedFeatures.filter((feat) =>
      product.features.includes(feat)
    ).length;
  }
  return score;
}

// Retorna recomendações de produtos baseadas nas seleções do usuário
const getRecommendations = (formData, allProducts) => {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } =
    formData;

  // Calcula o score de cada produto
  const scoredProducts = allProducts.map((product) => ({
    ...product,
    score: getScore(product, selectedPreferences, selectedFeatures),
  }));

  // Filtra produtos que possuem pelo menos um match (score > 0)
  let filtered = scoredProducts.filter((p) => p.score > 0);

  // Se o modo for "SingleProduct", retorna apenas o produto com maior score (último em caso de empate)
  if (selectedRecommendationType === 'SingleProduct') {
    if (filtered.length === 0) return [];
    const maxScore = Math.max(...filtered.map((p) => p.score));
    const bestProducts = filtered.filter((p) => p.score === maxScore);
    return [bestProducts[bestProducts.length - 1]];
  }

  // Se o modo for "MultipleProducts", retorna todos os produtos ordenados por score decrescente
  if (selectedRecommendationType === 'MultipleProducts') {
    return filtered.sort((a, b) => a.score - b.score || 1).reverse();
  }

  // Caso não tenha tipo selecionado, retorna todos os produtos com score > 0
  return filtered;
};

export default { getRecommendations };
