import Message from './models/message.js'; // Импортируем модель сообщения

export const handleSocketConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    // Отправляем историю чатов при подключении
    Message.find().sort({ timestamp: 1 }).exec((err, messages) => {
      if (err) {
        console.error('Error fetching chat history:', err);
        return;
      }
      socket.emit('chat history', messages);
    });

    // Обработка новых сообщений
    socket.on('chat message', (msg) => {
      const newMessage = new Message(msg);
      newMessage.save((err) => {
        if (err) {
          console.error('Error saving message:', err);
          return;
        }
        io.emit('chat message', msg); // Рассылаем сообщение всем пользователям
      });
    });

    // Обработка отключения клиента
    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
