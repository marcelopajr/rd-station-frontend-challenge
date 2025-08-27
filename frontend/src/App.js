import { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="bg-gray-100 min-h-screen flex flex-col items-center px-2">
      <h1 className="text-2xl sm:text-3xl font-bold my-6 text-center">
        Recomendador de Produtos RD Station
      </h1>
      <div className="bg-white rounded-lg shadow-md w-full max-w-3xl flex flex-col gap-6 p-4 sm:p-8">
        <div>
          <p className="text-base sm:text-lg text-justify">
            Bem-vindo ao Recomendador de Produtos RD Station. Aqui você pode
            encontrar uma variedade de produtos da RD Station, cada um projetado
            para atender às necessidades específicas do seu negócio. De CRM a
            Marketing, de Conversas a Inteligência Artificial, temos uma solução
            para ajudar você a alcançar seus objetivos. Use o formulário abaixo
            para selecionar suas preferências e funcionalidades desejadas e
            receba recomendações personalizadas de produtos que melhor atendam
            às suas necessidades.
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-6">
          <div className="w-full md:w-1/2 px-2">
            <Form onRecommendations={setRecommendations} />
          </div>
          <div className="w-full md:w-1/2 px-2">
            <RecommendationList recommendations={recommendations} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
