// Calcula o score de compatibilidade de um produto com base nas preferências e funcionalidades selecionadas
function getScore(product, selectedPreferences, selectedFeatures) {
  const prefScore =
    selectedPreferences?.filter((pref) => product.preferences.includes(pref))
      .length || 0;
  const featScore =
    selectedFeatures?.filter((feat) => product.features.includes(feat))
      .length || 0;
  return prefScore + featScore;
}

// Retorna recomendações de produtos baseadas nas seleções do usuário
function getRecommendations(formData, allProducts) {
  const { selectedPreferences, selectedFeatures, selectedRecommendationType } =
    formData;

  // Calcula o score de cada produto
  const scoredProducts = allProducts.map(function (product) {
    return {
      ...product,
      score: getScore(product, selectedPreferences, selectedFeatures),
    };
  });

  // Filtra produtos que possuem pelo menos um match (score > 0)
  const filtered = scoredProducts.filter(function (p) {
    return p.score > 0;
  });

  // Se o modo for "SingleProduct", retorna apenas o produto com maior score (último em caso de empate)
  if (selectedRecommendationType === 'SingleProduct') {
    if (filtered.length === 0) return [];
    const maxScore = Math.max.apply(
      null,
      filtered.map(function (p) {
        return p.score;
      })
    );
    const bestProducts = filtered.filter(function (p) {
      return p.score === maxScore;
    });
    return [bestProducts[bestProducts.length - 1]];
  }

  // Se o modo for "MultipleProducts", retorna todos os produtos ordenados por score decrescente
  if (selectedRecommendationType === 'MultipleProducts') {
    return filtered.sort(function (a, b) {
      return b.score - a.score;
    });
  }

  // Caso não tenha tipo selecionado, retorna todos os produtos com score > 0
  return filtered;
}

export default { getRecommendations };
