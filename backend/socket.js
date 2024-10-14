import Message from './models/message.js'; // Импортируем модель сообщения
import Room from './models/room.js';

export const handleSocketConnection = (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');
    
    // Подключение пользователя к определенной комнате
    socket.on('join room', async (roomId) => {
      console.log(roomId)
      try {
        const room = await Room.findById(roomId);
        
        if (!room) {
          // Отправляем сообщение об ошибке клиенту, если комната не найдена
          socket.emit('error', { message: `Room ${roomName} not found` });
          return;
        }

        // Присоединяем пользователя к комнате
        socket.join(roomId);
        console.log(`User joined room: ${room.name}`);

        // Отправляем историю чатов для конкретной комнаты
        try {
          const messages = await Message.find({ roomId: room._id }).sort({ timestamp: 1 }).exec();
          socket.emit('chat history', messages);  // Отправляем историю чатов
        } catch (err) {
          console.error(`Error fetching chat history for room: ${roomName}`, err);
          socket.emit('error', { message: 'Error fetching chat history' });
        }

      } catch (err) {
        console.error(err);
        socket.emit('error', { message: 'Error joining room' });
      }
    });

    // Событие получения сообщения
    socket.on('chat message', async (msg) => {
      const { message, username, roomId } = msg;
      console.log(message, username, roomId)
      try {
        // Проверяем наличие комнаты по имени
        const room = await Room.findById(roomId);
        if (!room) {
          socket.emit('error', { message: `Room ${roomId} not found` });
          return;
        }

        // Сохраняем сообщение в базе данных
        const savedMessage = await new Message({
          username,
          message,
          roomId: room._id  // Сохраняем roomId для сообщения
        }).save();

        // Отправляем сообщение всем клиентам в комнате
        io.to(roomId).emit('chat message', { 
          message, 
          username, 
          roomId: room._id,    // Отправляем roomId 
          roomName: room.name, // Отправляем roomName 
          timestamp: savedMessage.timestamp  // Отправляем timestamp
        });

      } catch (err) {
        console.error(err);
        socket.emit('error', { message: 'Error sending message' });
      }
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });
};
