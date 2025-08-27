function RecommendationList({ recommendations }) {
  return (
    <div className="max-w-md mx-auto mt-4">
      <h2 className="text-lg font-bold mb-4">Lista de Recomendações:</h2>
      {recommendations.length === 0 && <p>Nenhuma recomendação encontrada.</p>}

      <div className="flex flex-col gap-4">
        {recommendations.map((rec, index) => (
          <div
            key={index}
            className="rounded-xl border border-gray-200 shadow-md p-4 sm:p-6 bg-white flex flex-col gap-4 w-full max-w-full sm:max-w-md mx-auto"
          >
            <div className="flex items-center justify-between gap-2 flex-wrap">
              <h3 className="text-lg sm:text-xl font-semibold break-words">
                {rec.name}
              </h3>
              {rec.category && (
                <span className="bg-teal-100 text-teal-800 px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap mt-2 sm:mt-0">
                  {rec.category}
                </span>
              )}
            </div>
            {/* Preferências */}
            {rec.preferences && rec.preferences.length > 0 && (
              <div>
                <div className="text-sm font-semibold mb-1 text-gray-700">
                  Preferências:
                </div>
                <div className="flex flex-wrap gap-2">
                  {rec.preferences.map((pref, i) => (
                    <span
                      key={i}
                      className="bg-green-200 text-green-800 px-3 py-1 rounded-full text-xs font-medium break-words"
                    >
                      {pref}
                    </span>
                  ))}
                </div>
              </div>
            )}
            {/* Features */}
            {rec.features && rec.features.length > 0 && (
              <div>
                <div className="text-sm font-semibold mb-1 text-gray-700">
                  Funcionalidades:
                </div>
                <div className="flex flex-wrap gap-2">
                  {rec.features.map((feat, i) => (
                    <span
                      key={i}
                      className="bg-blue-200 text-blue-800 px-3 py-1 rounded-full text-xs font-medium break-words"
                    >
                      {feat}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default RecommendationList;
