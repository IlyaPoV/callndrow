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
        socket.on('chat message', async (msg) => {
          const { message, username, roomId } = msg;
          await new Message({ username, message, roomId: roomId }).save()

          io.to(roomId).emit('chat message', { message, username, roomId });
        });

      
        socket.on('disconnect', () => {
          console.log('Client disconnected');
        });
      });
        
};
