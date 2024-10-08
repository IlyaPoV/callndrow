import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectDatabase } from './database.js'; // Подключение базы данных
import { handleSocketConnection } from './socket.js'; // Логика работы с сокетами

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// Подключаем базу данных
connectDatabase();

// Обрабатываем подключения через Socket.io
handleSocketConnection(io);

// Маршрут для проверки работы сервера
app.get('/', (req, res) => {
  res.status(200).send('Welcome to the chat server!');
});

// Запуск сервера
const PORT = 4000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

export default server;
