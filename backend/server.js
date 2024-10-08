const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const mongoose = require('mongoose');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Подключение к базе данных
mongoose.connect('mongodb://localhost:27017/online_lesson', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messageSchema = new mongoose.Schema({
  username: String,
  message: String,
  timestamp: { type: Date, default: Date.now }
});

const Message = mongoose.model('Message', messageSchema);

io.on('connection', (socket) => {
  console.log('New client connected');
  
  // Отправляем историю чатов при подключении
  Message.find().sort({ timestamp: 1 }).exec((err, messages) => {
    if (err) return console.error(err);
    socket.emit('chat history', messages);
  });

  // Обработка новых сообщений
  socket.on('chat message', (msg) => {
    const newMessage = new Message(msg);
    newMessage.save((err) => {
      if (err) return console.error(err);
      io.emit('chat message', msg);
    });
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(4000, () => {
  console.log('Server is listening on port 4000');
});
