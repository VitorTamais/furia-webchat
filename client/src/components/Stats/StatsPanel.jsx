import { useState, useEffect } from 'react';

export default function StatsPanel({ queryType }) {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (queryType) {
      setIsVisible(true);
    }
  }, [queryType]);

  const renderStats = () => {
    switch(queryType) {
      case 'player':
        return <PlayerStats />;
      case 'team':
        return <TeamStats />;
      case 'ranking':
        return <RankingStats />;
      default:
        return null;
    }
  };

  if (!isVisible) return null;

  return (
    <div className="my-4 bg-gradient-to-r from-gray-900 to-black border border-white/10 rounded-lg overflow-hidden animate-fadeIn">
      <div className="p-3 border-b border-white/10 flex justify-between items-center">
        <h3 className="text-white font-bold text-sm uppercase tracking-wider">Estatísticas Detalhadas</h3>
        <button 
          onClick={() => setIsVisible(false)}
          className="text-white/60 hover:text-white"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="p-4">
        {renderStats()}
      </div>
    </div>
  );
}

function PlayerStats() {
  return (
    <div className="grid grid-cols-3 gap-3 text-center">
      <StatCard label="Rating" value="1.29" highlight={true} />
      <StatCard label="K/D" value="1.45" />
      <StatCard label="HS%" value="68.2%" />
      <StatCard label="Mapas" value="245" />
      <StatCard label="Vitórias" value="163" />
      <StatCard label="Títulos" value="7" />
    </div>
  );
}

function TeamStats() {
  return (
    <div>
      <div className="mb-4">
        <h4 className="text-white/80 text-xs mb-2">DESEMPENHO NOS ÚLTIMOS 5 JOGOS</h4>
        <div className="flex gap-1">
          <div className="w-1/5 h-2 bg-white rounded-sm"></div>
          <div className="w-1/5 h-2 bg-white rounded-sm"></div>
          <div className="w-1/5 h-2 bg-white/30 rounded-sm"></div>
          <div className="w-1/5 h-2 bg-white rounded-sm"></div>
          <div className="w-1/5 h-2 bg-white rounded-sm"></div>
        </div>
        <div className="flex justify-between text-xs text-white/60 mt-1">
          <span>4 vitórias</span>
          <span>1 derrota</span>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 text-center">
        <StatCard label="Win Rate" value="73%" highlight={true} />
        <StatCard label="Rounds" value="489" />
        <StatCard label="Mapas" value="32" />
      </div>
    </div>
  );
}

function RankingStats() {
  return (
    <div>
      <div className="flex items-end mb-4">
        <div className="h-16 w-1/3 bg-white/20 rounded-t-sm flex items-end justify-center">
          <div className="text-xs text-white/80 pb-1">#3</div>
        </div>
        <div className="h-20 w-1/3 bg-white rounded-t-sm flex items-end justify-center">
          <div className="text-xs text-black font-bold pb-1">#1</div>
        </div>
        <div className="h-14 w-1/3 bg-white/40 rounded-t-sm flex items-end justify-center">
          <div className="text-xs text-white/80 pb-1">#2</div>
        </div>
      </div>
      <div className="border-t border-white/10 pt-3">
        <div className="text-center">
          <p className="text-white font-bold">Ranking Mundial: #2</p>
          <p className="text-white/60 text-xs">+3 posições nos últimos 3 meses</p>
        </div>
      </div>
    </div>
  );
}

function StatCard({ label, value, highlight = false }) {
  return (
    <div className={`p-2 rounded ${highlight ? 'bg-white text-black' : 'bg-white/5 text-white'}`}>
      <p className={`text-lg font-bold ${highlight ? 'text-black' : 'text-white'}`}>{value}</p>
      <p className={`text-xs ${highlight ? 'text-black/70' : 'text-white/70'}`}>{label}</p>
    </div>
  );
}
