<h1 align="center">


<b><a href="https://tech4um.vercel.app/">Tech4um</a></b>

</h1>

<h4 align="center">Uma plataforma de fórum moderna e em tempo real baseada em WebSockets.</h4>

<p align="center">
<a href="#-sobre">Sobre</a> •
<a href="#-funcionalidades">Funcionalidades</a> •
<a href="#-tecnologias">Tecnologias</a> •
<a href="#-instalação">Instalação</a> •
<a href="#-equipa">Equipa</a>
</p>

<p align="center">
<img src="https://www.google.com/search?q=https://img.shields.io/badge/React-20232A%3Fstyle%3Dfor-the-badge%26logo%3Dreact%26logoColor%3D61DAFB" alt="React" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/TypeScript-007ACC%3Fstyle%3Dfor-the-badge%26logo%3Dtypescript%26logoColor%3Dwhite" alt="TypeScript" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Node.js-43853D%3Fstyle%3Dfor-the-badge%26logo%3Dnode.js%26logoColor%3Dwhite" alt="Node.js" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Socket.io-010101%3Fstyle%3Dfor-the-badge%26logo%3Dsocket.io%26logoColor%3Dwhite" alt="Socket.io" />
<img src="https://img.shields.io/badge/Prisma-3982CE?style=for-the-badge&logo=Prisma&logoColor=white" alt="Prisma" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/PostgreSQL-316192%3Fstyle%3Dfor-the-badge%26logo%3Dpostgresql%26logoColor%3Dwhite" alt="Postgres" />
<img src="https://www.google.com/search?q=https://img.shields.io/badge/Tailwind_CSS-38B2AC%3Fstyle%3Dfor-the-badge%26logo%3Dtailwind-css%26logoColor%3Dwhite" alt="Tailwind" />
</p>

📖 Sobre

O Tech4um é uma aplicação web desenvolvida para facilitar discussões em tempo real. O objetivo do projeto foi criar uma experiência fluida onde utilizadores podem criar salas, trocar mensagens instantâneas e interagir de forma privada ou pública, tudo com persistência de dados e feedback visual imediato.

O projeto utiliza uma arquitetura Monorepo (Client + Server) e implementa comunicação Full-Duplex via WebSocket.

🚀 Funcionalidades

* Chat em Tempo Real (Core)

Comunicação Instantânea: Mensagens entregues via Socket.io sem necessidade de refresh.

Salas (Rooms): Isolamento de contexto. Mensagens de uma sala não vazam para outra.

Mensagens Privadas: Ao clicar num participante, o modo "Privado" é ativado (input muda de cor) e a mensagem é filtrada apenas para o destinatário.

Persistência Híbrida: Mensagens são salvas no PostgreSQL e recuperadas via API REST ao recarregar a página.

* Dashboard Inteligente

Ranking Automático: Salas com maior atividade (número de mensagens) ganham destaque visual ("Tópico em Destaque!") e sobem para o topo da lista.

Contagem ao Vivo: O backend cruza dados do banco com a memória do Socket para exibir quantos utilizadores estão online em cada sala (+X pessoas).

Busca: Filtro em tempo real por nome ou descrição da sala.

* Gestão e Segurança

Autenticação Simplificada: Login e Cadastro unificados num modal intuitivo.

Gestão de Salas: Utilizadores podem criar novas salas.

Permissões: Apenas o criador da sala visualiza o botão de excluir (Lixeira).

Integridade de Dados: Implementação de Cascade Delete no banco (se o utilizador for apagado, as suas mensagens e salas também são).

📸 Screenshots

Dashboard (Ranking & Busca)
<img width="1217" height="883" alt="image" src="https://github.com/user-attachments/assets/ead2bb58-c0b9-49ff-83c6-0e9cd663b4f4" />


Chat Privado (Visual Diferenciado)
<img width="1914" height="901" alt="image" src="https://github.com/user-attachments/assets/10ffb4df-769b-41a2-903d-de23b6021d0a" />

🛠 Tecnologias

Frontend:

* React + Vite: Para uma UI rápida e reativa.
* TypeScript: Tipagem estrita para User, Room e Message.
* Tailwind CSS: Estilização fidelizada ao protótipo (Figma).
* Socket.io-client: Gestão de eventos de websocket.
* Axios: Comunicação HTTP com a API.

Backend:

* Node.js + Express: API REST para rotas de Auth e Histórico.
* Socket.io: Servidor WebSocket com gestão de estado em memória (Online Users).
* Prisma ORM: Manipulação do banco de dados e gestão de Schemas.
* PostgreSQL: Banco de dados relacional (Hospedado no Render).
* BcryptJS: Hash e segurança de senhas.

📦 Instalação

Pré-requisitos

Node.js instalado

Git instalado

# 1. Clonar o repositório

git clone https://github.com/Alezuzzo/Tech4um-Grupo05.git
<br>cd tech4um


# 2. Configurar o Backend

cd server
<br>npm install

Crie um arquivo .env na pasta server com:
DATABASE_URL="sua-url-postgres-aqui"
PORT=3000

# Sincronizar o banco de dados
npx prisma generate
<br>npx prisma db push

# Rodar o servidor
npm run dev


# 3. Configurar o Frontend

Abra um novo terminal:

cd client
npm install

# Rodar o frontend
npm run dev


Acesse a http://localhost:5173 no seu navegador.

Equipe:

<br>Este projeto foi desenvolvido de forma colaborativa pelo Grupo 5:
<br>Thalles Alexsander Faria Muzzo
<br>Felipe Augusto Martins Tosta Faria
<br>Humberto Mansur Ferreira de Moura

<p align="center">Feito com 💙 pelo Grupo 5</p>
