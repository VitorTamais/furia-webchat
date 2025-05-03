export default function TypingIndicator() {
    return (
      <div className="flex items-center p-3 max-w-[180px] bg-black/70 border border-white/10 rounded-full shadow-glow my-4">
        <div className="flex items-center space-x-2">
          <div className="relative flex space-x-1">
            <div className="h-2 w-2 bg-white rounded-full animate-bounce"></div>
            <div className="h-2 w-2 bg-white/80 rounded-full animate-bounce" 
                 style={{ animationDelay: '150ms' }}></div>
            <div className="h-2 w-2 bg-white/60 rounded-full animate-bounce" 
                 style={{ animationDelay: '300ms' }}></div>
          </div>
          <span className="text-white/90 text-xs font-medium tracking-wide">Digitando...</span>
        </div>
      </div>
    );
  }
  