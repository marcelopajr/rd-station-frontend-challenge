import recommendationService from './recommendation.service';
import mockProducts from '../mocks/mockProducts';

describe('Lógica de recomendação', () => {
  test('Retorna recomendação correta para SingleProduct com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração com chatbots'],
      selectedFeatures: ['Chat ao vivo e mensagens automatizadas'],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });

  test('Retorna recomendações corretas para MultipleProducts com base nas preferências selecionadas', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Personalização de funis de vendas',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'MultipleProducts',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(2);
    expect(recommendations.map((product) => product.name)).toEqual([
      'RD Station CRM',
      'RD Station Marketing',
    ]);
  });

  test('Retorna apenas um produto para SingleProduct com mais de um produto de match', () => {
    const formData = {
      selectedPreferences: [
        'Integração fácil com ferramentas de e-mail',
        'Automação de marketing',
      ],
      selectedFeatures: [
        'Rastreamento de interações com clientes',
        'Rastreamento de comportamento do usuário',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Station Marketing');
  });

  test('Retorna o último match em caso de empate para SingleProduct', () => {
    const formData = {
      selectedPreferences: [
        'Automação de marketing',
        'Integração com chatbots',
      ],
      selectedRecommendationType: 'SingleProduct',
    };

    const recommendations = recommendationService.getRecommendations(
      formData,
      mockProducts
    );

    expect(recommendations).toHaveLength(1);
    expect(recommendations[0].name).toBe('RD Conversas');
  });
});

describe('Lógica de desabilitação do botão de envio', () => {
  // Replicando a lógica usada no SubmitButton
  function isSubmitDisabled({
    selectedPreferences,
    selectedFeatures,
    selectedRecommendationType,
  }) {
    return (
      !selectedRecommendationType ||
      ((!selectedPreferences || selectedPreferences.length === 0) &&
        (!selectedFeatures || selectedFeatures.length === 0))
    );
  }

  test('Botão desabilitado se nenhuma preferência e nenhuma funcionalidade forem selecionadas', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };
    expect(isSubmitDisabled(formData)).toBe(true);
  });

  test('Botão desabilitado se nenhum tipo de recomendação for selecionado', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Rastreamento de interações com clientes'],
      selectedRecommendationType: '',
    };
    expect(isSubmitDisabled(formData)).toBe(true);
  });

  test('Botão desabilitado se preferências for undefined e features vazio', () => {
    const formData = {
      selectedPreferences: undefined,
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };
    expect(isSubmitDisabled(formData)).toBe(true);
  });

  test('Botão desabilitado se features for undefined e preferências vazio', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: undefined,
      selectedRecommendationType: 'SingleProduct',
    };
    expect(isSubmitDisabled(formData)).toBe(true);
  });

  test('Botão habilitado se pelo menos uma preferência for selecionada', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: [],
      selectedRecommendationType: 'SingleProduct',
    };
    expect(isSubmitDisabled(formData)).toBe(false);
  });

  test('Botão habilitado se pelo menos uma funcionalidade for selecionada', () => {
    const formData = {
      selectedPreferences: [],
      selectedFeatures: ['Rastreamento de interações com clientes'],
      selectedRecommendationType: 'SingleProduct',
    };
    expect(isSubmitDisabled(formData)).toBe(false);
  });

  test('Botão habilitado se ambos preferência e feature forem selecionadas', () => {
    const formData = {
      selectedPreferences: ['Integração fácil com ferramentas de e-mail'],
      selectedFeatures: ['Rastreamento de interações com clientes'],
      selectedRecommendationType: 'MultipleProducts',
    };
    expect(isSubmitDisabled(formData)).toBe(false);
  });
});
