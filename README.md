# ChatApp

A full-stack real-time chat application built with Spring Boot and React. Users can create or join chat rooms, exchange messages instantly through WebSockets, and keep room history in MongoDB.

## Live Demo

https://javachatapp-19mq.onrender.com

## Features

- Create and join chat rooms using a room ID
- Real-time messaging with STOMP/WebSocket
- Message history persisted in MongoDB
- Responsive React UI for joining rooms and chatting

## Tech Stack

- Backend: Java 21, Spring Boot 3.5, Spring WebSocket, Spring Data MongoDB
- Frontend: React 19, Vite, Tailwind CSS, Axios
- Database: MongoDB

## Project Structure

```text
ChatApp/
├── chat-app-backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/substring/chat/
│   │   │   │   ├── config/
│   │   │   │   ├── controllers/
│   │   │   │   ├── entities/
│   │   │   │   ├── playload/
│   │   │   │   └── repositories/
│   │   │   └── resources/application.properties
│   │   └── test/
│   ├── compose.yaml
│   ├── pom.xml
│   └── mvnw
├── front-chat/
│   ├── src/
│   │   ├── components/
│   │   ├── config/
│   │   ├── context/
│   │   ├── services/
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
└── README.md
```

## Prerequisites

- Java 21
- Node.js 18+ and npm
- MongoDB instance (local or Atlas)

## Backend Setup

1. Navigate to the backend folder:
   ```bash
   cd chat-app-backend
   ```
2. Start MongoDB if you are using the provided Docker setup:
   ```bash
   docker compose up -d
   ```
3. Update the MongoDB connection string in [chat-app-backend/src/main/resources/application.properties](chat-app-backend/src/main/resources/application.properties) if needed.
4. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```

The backend will start on http://localhost:8080.

## Frontend Setup

1. Navigate to the frontend folder:
   ```bash
   cd front-chat
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```

The frontend will be available at http://localhost:5173.

## API Overview

The backend exposes REST endpoints for room management and WebSocket endpoints for real-time chat:

- POST /api/v1/rooms - Create a room
- GET /api/v1/rooms/{roomId} - Join or fetch a room
- GET /api/v1/rooms/{roomId}/messages - Fetch paginated room messages
- WebSocket endpoint: /chat
- STOMP message mapping: /app/sendMessage/{roomId}

## Notes for Local Development

If you want to run the app locally with the frontend on localhost, update the allowed origin values in the backend WebSocket and controller configuration to include http://localhost:5173.

