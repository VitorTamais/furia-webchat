require('dotenv').config();
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const socketIO = require('socket.io');

// Conexão MongoDB com tratamento completo
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://127.0.0.1:27017/furia-chat');
    console.log('✅ Conectado ao MongoDB!');
  } catch (err) {
    console.error('❌ Falha na conexão MongoDB:', err.message);
    process.exit(1);
  }
};

// Modelo de Mensagem
const Message = mongoose.model('Message', {
  text: String,
  sender: String,
  timestamp: { type: Date, default: Date.now }
});

const perplexityApi = axios.create({
  baseURL: 'https://api.perplexity.ai',
  headers: {
    'Authorization': `Bearer ${process.env.PERPLEXITY_KEY}`,
    'Content-Type': 'application/json'
  }
});

// Iniciar servidor após conexão DB
(async () => {
  await connectDB();
  
  const app = express();
  const server = app.listen(3001, () => {
    console.log('Servidor rodando na porta 3001');
  });

  const io = socketIO(server, {
    cors: {
      origin: "http://localhost:5173",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    console.log('Usuário conectado:', socket.id); // Adicione para debug
  
    // Adicione esta função para verificar se a pergunta é sobre FURIA/CS:GO
    function isFuriaQuestion(text) {
      // Palavras-chave sobre outros temas que devem ser bloqueados
      const forbiddenKeywords = ['seleção brasileira', 'marquinhos', 'html', 'neymar', 'copa do mundo', 'programação'];
      
      // Se contém palavras-chave proibidas, retorna false diretamente
      if (forbiddenKeywords.some(keyword => text.toLowerCase().includes(keyword))) {
        return false;
      }
      
      // Lista ampliada de palavras-chave relacionadas à FURIA
      const furiaKeywords = [
        'furia', 'cs', 'csgo', 'cs:go', 'counterstrike', 'kscerato', 'yuurih', 'art', 'guerri', 'fallen',
        'jogador', 'time', 'partida', 'jogo', 'campeonato', 'titulo', 'mapa', 'estatistica', 'rating',
        'major', 'esl', 'blast', 'pgl', 'rifle', 'awp', 'coach', 'igl', 'clutch', 'hltv'
      ];
      
      // Verifica se pelo menos uma palavra-chave FURIA está presente
      return furiaKeywords.some(keyword => text.toLowerCase().includes(keyword));
    }

// Modifique o tratamento da mensagem
socket.on('userMessage', async (msg) => {
  try {
    // Salvar mensagem do usuário
    const userMsg = new Message({ text: msg, sender: 'user' });
    await userMsg.save();

    // Verificar se é pergunta sobre FURIA
    if (!isFuriaQuestion(msg)) {
      const resposta = "Opa! Só falo sobre a FURIA CS:GO. Me pergunte sobre nosso time, jogadores, partidas ou conquistas! 🐆";
      socket.emit('botResponse', resposta);
      await new Message({ text: resposta, sender: 'bot' }).save();
      return;
    }

    // Requisição para Perplexity com prompt reformulado
    const response = await perplexityApi.post('/chat/completions', {
      model: "sonar-pro",
      messages: [{
        role: "system",
        content: `Você é o ChatBot oficial da FURIA CS:GO! Sua missão:

1️⃣ APENAS fale sobre a FURIA e CS:GO - NUNCA sobre outros assuntos
2️⃣ Se a pergunta não for sobre FURIA/CS:GO, diga apenas: "Opa! Só falo sobre a FURIA CS:GO. Me pergunte sobre nosso time, jogadores, partidas ou conquistas! 🐆"
3️⃣ SEMPRE responda em formato de tópicos organizados, com emojis e linguagem descontraída como um fã
4️⃣ NUNCA mencione outros times/jogadores que não sejam de CS:GO
5️⃣ Use APENAS estes dados oficiais atualizados (3 de maio de 2025):

🎮 PRÓXIMO JOGO:
- FURIA vs The MongolZ (10/05/2025, 01:00 - PGL Astana 2025)

🏆 DESEMPENHO RECENTE:
- Vitórias nos últimos 5 jogos: 4 (80%)
- Vitórias nos últimos 10 jogos: 7 (70%)
- Vitórias nos últimos 3 meses: 9 de 14 (65%)
- Ranking mundial atual: #7

👥 JOGADORES ATUAIS:
- KSCERATO: Rating 1.22, 48.3% HS, Rifler estrela
- yuurih: Rating 1.19, Lurker, Top 20 HLTV 2020/2022
- arT: Rating 1.00, Capitão e IGL
- guerri: Coach veterano
- FalleN: AWPer lendário

Exemplo do FORMATO que deve usar nas respostas:

"🔥 [Título da Resposta]

• [Ponto 1]
• [Ponto 2]
• [Ponto 3]

💡 [Curiosidade relevante]"

IMPORTANTE: arT (Andrei Piovezan) é o CAPITÃO da FURIA CS:GO. Qualquer pergunta sobre "capitão" refere-se a ele!`
      }, {
        role: "user",
        content: msg
      }]
    });

    const aiResponse = response.data.choices[0].message.content;
    await new Message({ text: aiResponse, sender: 'bot' }).save();
    socket.emit('botResponse', aiResponse);

  } catch (error) {
    console.error('Erro:', error);
    socket.emit('botResponse', '❌ Erro ao processar sua mensagem. Tente novamente!');
  }
});
  });
})();
