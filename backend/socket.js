import Message from './models/message.js'; // Импортируем модель сообщения

export const handleSocketConnection = (io) => {

    io.on('connection', (socket) => {
        console.log('New client connected');
      
        // Подключение пользователя к определенной комнате
        socket.on('join room', async (roomId) => {
          socket.join(roomId);
          console.log(`User joined room: ${roomId}`);
          
          // Отправляем историю чатов для конкретной комнаты
          try {
            const messages = await Message.find({ roomId }).sort({ timestamp: 1 }).exec();
            socket.emit('chat history', messages);
          } catch (err) {
            console.error(err);
          }
        });
      
        // Событие получения сообщения
        socket.on('chat message', (msg) => {
        const { message, username, roomId } = msg;
        const newMessage = new Message({ username, message, room: roomId });

        newMessage.save().then(() => {
            // Отправляем новое сообщение всем в комнате
            io.to(roomId).emit('chat message', { message, username, roomId });
        });
        });

      
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });
        
};
