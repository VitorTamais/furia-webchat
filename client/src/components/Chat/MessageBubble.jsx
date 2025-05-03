export default function MessageBubble({ message, sender, direction }) {
    return (
      <div className={`flex ${direction === 'incoming' ? 'justify-start' : 'justify-end'} animate-fadeIn`}>
        <div
          className={`max-w-[80%] p-4 rounded-lg shadow-custom
            ${direction === 'incoming'
              ? 'bg-black text-white border-2 border-white/20'
              : 'bg-white text-black border-2 border-black'}`}
          style={direction === 'incoming' ? { whiteSpace: 'pre-wrap' } : {}}
        >
          <div className="flex items-center justify-between mb-2">
            <p className="font-bold text-sm">{sender}</p>
            <div className={`w-2 h-2 rounded-full ${direction === 'incoming' ? 'bg-white' : 'bg-black'}`}></div>
          </div>
          <p className="text-md leading-tight">{message}</p>
          <p className={`text-xs mt-2 text-right ${direction === 'incoming' ? 'text-white/50' : 'text-black/50'}`}>
            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          </p>
        </div>
      </div>
    );
  }