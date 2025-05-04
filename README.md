
# FURIA WebChat 🐆

O FURIA WebChat é uma interface conversacional desenvolvida para os fãs do time de CS:GO da FURIA. Este projeto permite que os usuários interajam com um chatbot especializado que responde perguntas sobre o time, jogadores, histórico de partidas, próximos jogos e curiosidades.

A aplicação utiliza inteligência artificial para processar perguntas em linguagem natural e fornecer respostas precisas e contextualizadas sobre o universo da FURIA Esports.




## ✨ Funcionalidades

- **Chatbot Inteligente:** IA treinada com informações específicas da FURIA CS:GO
- **Comunicação em Tempo Real:** Respostas instantâneas via Socket.IO
- **Histórico de Mensagens:** Armazenamento de conversas no MongoDB
- **Design Temático:** Interface inspirada nas cores e identidade visual da FURIA
- **Responsivo:** Adaptação a diferentes tamanhos de tela
- **Indicador de Digitação:** Feedback visual quando o bot está elaborando respostas


## 🚀 Tecnologias

**Front-end:** 

React: Biblioteca JavaScript para construção de interfaces

TailwindCSS: Framework CSS para estilização eficiente

Socket.IO Client: Comunicação em tempo real com o servidor

React Icons: Biblioteca de ícones

Vite: Build tool para desenvolvimento rápido

**Back-end:** 

Node.js: Ambiente de execução JavaScript

Express: Framework web para Node.js

Socket.IO: Biblioteca para comunicação em tempo real

MongoDB/Mongoose: Banco de dados e ODM para persistência de dados

Perplexity API: Processamento de linguagem natural avançado


## 🔧 Instalação

**Pré-requisitos:**

- Node.js (v16+)
- MongoDB
- NPM ou Yarn

**Passos:**
-  Clone o repositório: 

```bash
git clone https://github.com/VitorTamais/furia-webchat.git
cd furia-webchat
```

- Instale as dependências do servidor:

```bash
cd server
npm install
```

- Configure as variáveis de ambiente:
Crie um arquivo .env na pasta server com:

```bash
PERPLEXITY_KEY=sua-chave-da-perplexity-aqui
MONGODB_URI=mongodb://127.0.0.1:27017/furia-chat
PORT=3001
```

- Instale as dependências do cliente:

```bash
cd ../client
npm install
```

- Inicie o MongoDB:

```bash
mongod --dbpath=C:\data\db
```

- Inicie o Servidor:

```bash
cd ../server
node server.js
```

- Em outro terminal, inicie o cliente:

```bash
cd ../client
npm run dev
```

- Acesse a aplicação:
Abra seu navegador em http://localhost:5173


## 💬 Como Usar

- Acesse a aplicação através do navegador
- Digite uma pergunta sobre a FURIA CS:GO no campo de texto
- Pressione Enter ou clique no botão de enviar
- Observe o chatbot processando (indicador de digitação)
- Receba a resposta personalizada sobre o time que tanto ama!

**Exemplos de perguntas:**

- "Quem são os jogadores atuais da FURIA?"

- "Quando será o próximo jogo?"

- "Qual a história da FURIA no CS:GO?"

- "Quais os maiores títulos do time?"


## 📂 Estrutura

```bash
furia-webchat/
├── client/
│   ├── public/
│   │   ├── furia-logo.png
│   │   └── index.html
│   ├── src/
│   │   ├── assets/
│   │   │   └── react.svg
│   │   ├── components/
│   │   │   ├── Chat/
│   │   │   │   ├── MessageBubble.jsx
│   │   │   │   ├── TypingIndicator.jsx
│   │   │   │   └── SuggestionChips.jsx    # (opcional, para botões de sugestões rápidas)
│   │   │   └── Stats/
│   │   │       └── StatsPanel.jsx    # (opcional, para painel de estatísticas)
│   │   ├── pages/
│   │   │   └── ChatPage.jsx
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── App.css
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   ├── package.json
│   └── README.md
├── server/
│   ├── node_modules/
│   ├── .env
│   ├── package.json
│   ├── server.js
│   ├── tailwind.config.js (se usar Tailwind no backend, geralmente não precisa)
│   └── README.md
├── README.md
├── package.json
└── .gitignore
```


## 👥 Contribuição

Contribuições são bem-vindas! Para contribuir:

- Faça um Fork do projeto

- Crie uma branch para sua feature (git checkout -b feature/feature-incrivel)

- Commit suas mudanças (git commit -m 'adicionando uma feature incrivel')

- Push para a branch (git push origin feature/feature-incrivel)

- Abra um Pull Request


## 📄 Licença

Desenvolvido com 🧡 para o desafio da FURIA Esports, espero que tenham gostado!

