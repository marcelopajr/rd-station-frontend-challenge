import { useState } from 'react';
import Form from './components/Form/Form';
import RecommendationList from './components/RecommendationList/RecommendationList';

function App() {
  const [recommendations, setRecommendations] = useState([]);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-white via-purple-50 to-blue-50 flex flex-col overflow-hidden">
      {/* Blobs no background */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>
      <div className="absolute top-1/2 -left-60 w-[400px] h-[400px] bg-cyan-400 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-4000"></div>
      <div className="absolute top-1/3 -right-60 w-[450px] h-[450px] bg-sky-300 rounded-full mix-blend-multiply filter blur-3xl opacity-50 animate-blob animation-delay-6000"></div>

      {/* Conteúdo principal */}
      <header className="py-10 px-8 relative z-10">
        <h1 className="text-4xl font-extrabold text-center text-gray-900 mb-4">
          Recomendador de Produtos RD Station
        </h1>
        <p className="text-center text-lg text-gray-700 max-w-xl mx-auto">
          Descubra quais soluções RD Station são ideais para o seu negócio.
          Selecione suas preferências e funcionalidades desejadas para receber
          recomendações personalizadas.
        </p>
      </header>

      <main className="flex-1 flex items-center justify-center px-2 pb-10 relative z-10">
        <div className="bg-white rounded-2xl shadow-xl p-4 w-full max-w-5xl flex flex-col md:flex-row gap-8">
          <section className="md:w-1/2">
            <Form onRecommendations={setRecommendations} />
          </section>
          <section className="md:w-1/2">
            <RecommendationList recommendations={recommendations} />
          </section>
        </div>
      </main>
    </div>
  );
}

export default App;
