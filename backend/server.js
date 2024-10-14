import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import { connectDatabase } from './database.js'; // Подключение базы данных
import { handleSocketConnection } from './socket.js'; // Логика работы с сокетами
import cors from 'cors'; // Импортируем cors
import RoomRouter from './router/room.js';

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3000', // Разрешаем запросы только с этого адреса
      methods: ['GET', 'POST'], // Разрешенные методы
      credentials: true // Разрешаем передачу куки
    },
    transports: ['websocket', 'polling'], // Включаем транспорт WebSockets и Polling
  });

app.use(cors({
    origin: 'http://localhost:3000', // Замените на URL вашего фронтенда
    methods: ['GET', 'POST'],
    credentials: true // Если у вас есть куки или сессии
}));

// Подключаем базу данных
connectDatabase();

// Обрабатываем подключения через Socket.io
handleSocketConnection(io);

app.use('/api/room', RoomRouter);
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
