export default function SuggestionChips({ onSelectSuggestion }) {
    const suggestions = [
      "Quem é o capitão atual do time de CS da FURIA?",
      "Próximo jogo da FURIA?",
      "Quais títulos a FURIA já ganhou?",
      "Melhor jogador do time de CS da FURIA?"
    ];
  
    return (
      <div className="pb-4 pt-2">
        <p className="text-white/60 text-xs mb-2 font-medium tracking-wide">PERGUNTAS FREQUENTES:</p>
        <div className="flex flex-wrap gap-2">
          {suggestions.map((suggestion, index) => (
            <button
              key={index}
              onClick={() => onSelectSuggestion(suggestion)}
              className="bg-white/10 border border-white/5 text-white/80 text-xs py-1.5 px-3 
                       rounded-full hover:bg-white/20 transition-all duration-300 
                       focus:outline-none focus:ring-1 focus:ring-white/30 group"
            >
              <span className="group-hover:text-white transition-colors">
                {suggestion}
              </span>
            </button>
          ))}
        </div>
      </div>
    );
  }
  