import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
import { useParams, useLocation } from 'react-router-dom';

const socket = io('http://localhost:4000'); // Подключаемся к серверу

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState('');
  const [isConnected, setIsConnected] = useState(false); // Для отслеживания соединения

  const { roomId } = useParams(); // Получаем roomId из URL
  const location = useLocation(); // Получаем данные о пользователе (username)
  const username = location.state?.username || 'User'; // Получаем имя пользователя из состояния (state)

  useEffect(() => {
    if (roomId) {
      socket.emit('join room', roomId); // Подключаемся к конкретной комнате
      console.log(`${username} joined room: ${roomId}`);
    } else {
      console.error('Error: Room ID is null');
    }

    // Проверка успешного соединения
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('Connected to server');
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('Disconnected from server');
    });

    // Получаем историю сообщений
    socket.on('chat history', (history) => {
      setMessages(history);
    });

    // Обрабатываем новые сообщения
    socket.on('chat message', (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    return () => {
      socket.off('chat history');
      socket.off('chat message');
      socket.off('connect');
      socket.off('disconnect');
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (message.trim()) {
      // Отправляем сообщение на сервер
      socket.emit('chat message', { message, username, roomId });
      setMessage(''); // Очищаем поле ввода
    } else {
      console.log('Message is empty!');
    }
  };

  return (
    <div style={styles.container}>
      <h1>Chat Room</h1>
      <p>Welcome, {username}</p> {/* Отображаем имя пользователя */}
      <Chat 
        messages={messages} 
        sendMessage={sendMessage} 
        message={message}
        setMessage={setMessage}
        isConnected={isConnected}
      />
      {!isConnected && <p>Reconnecting...</p>} {/* Показать, если соединение отсутствует */}
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
  },
};

export default ChatRoom;
