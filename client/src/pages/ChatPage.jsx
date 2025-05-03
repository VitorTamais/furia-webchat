import { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import TypingIndicator from '../components/Chat/TypingIndicator';
import MessageBubble from '../components/Chat/MessageBubble';
import SuggestionChips from '../components/Chat/SuggestionChips';
import StatsPanel from '../components/Stats/StatsPanel';
import { FiSend } from 'react-icons/fi';

const socket = io('http://localhost:3001');

export default function ChatPage() {
  const [messages, setMessages] = useState([{
    message: "🔥 Bem-vindo ao Chat Oficial da FURIA! Pergunte sobre o time de CS:GO!",
    sender: "FURIA Bot",
    direction: "incoming"
  }]);
  
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [statsType, setStatsType] = useState(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('botResponse', handleBotResponse);
    return () => socket.off('botResponse');
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleBotResponse = (response) => {
    setMessages(prev => [...prev, {
      message: response,
      sender: "FURIA Bot",
      direction: "incoming"
    }]);
    setIsTyping(false);
    
    // Determinar o tipo de estatísticas a mostrar
    if (response.toLowerCase().includes('kscerato') || 
        response.toLowerCase().includes('fallen') || 
        response.toLowerCase().includes('jogador')) {
      setStatsType('player');
    } else if (response.toLowerCase().includes('ranking') ||
               response.toLowerCase().includes('posição')) {
      setStatsType('ranking');
    } else if (response.toLowerCase().includes('desempenho') ||
               response.toLowerCase().includes('partidas') ||
               response.toLowerCase().includes('jogos')) {
      setStatsType('team');
    }
  };

  const handleSend = () => {
    if (input.trim() === '') return;
    
    setMessages(prev => [...prev, {
      message: input,
      sender: "Você",
      direction: "outgoing"
    }]);
    
    setIsTyping(true);
    socket.emit('userMessage', input);
    setInput('');
  };

  const handleSuggestionClick = (suggestion) => {
    setInput(suggestion);
    handleSend();
  };

  return (
    <div className="h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col">
      {/* Cabeçalho */}
      <header className="bg-black p-4 border-b-2 border-white/20 sticky top-0 z-50">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/furia-logo.png" 
              alt="FURIA Logo" 
              className="h-10 filter brightness-0 invert" 
            />
            <div className="ml-4">
              <h1 className="text-2xl font-black tracking-tight text-white">FURIA <span className="font-thin">WEBCHAT</span></h1>
              <div className="flex items-center">
                <span className="h-2 w-2 bg-white rounded-full mr-2 animate-pulse"></span>
                <p className="text-white/70 text-xs uppercase tracking-widest">ONLINE</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Área de mensagens */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <MessageBubble 
            key={i}
            message={msg.message}
            sender={msg.sender}
            direction={msg.direction}
          />
        ))}
        
        {statsType && <StatsPanel queryType={statsType} />}
        
        {isTyping && <TypingIndicator />}
        <div ref={messagesEndRef} />
      </div>

      {/* Sugestões de perguntas */}
      <div className="border-t border-white/10 px-4">
        <SuggestionChips onSelectSuggestion={handleSuggestionClick} />
      </div>

      {/* Input */}
      <div className="p-4 bg-black border-t border-white/10">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Faça uma pergunta Furiosa 🔥"
            className="flex-1 bg-white/5 border border-white/10 text-white rounded-lg px-4 py-3
                      focus:outline-none focus:ring-1 focus:ring-white/30 placeholder-white/40"
          />
          <button
            onClick={handleSend}
            className="bg-white text-black p-3 rounded-lg
                     hover:bg-white/90 transition-all duration-300"
          >
            <FiSend className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
