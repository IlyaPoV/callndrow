import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConnectionStatus, setRoomId } from '../store/socketSlice';
import { addMessage, setMessages } from '../store/chatSlice';
import io from 'socket.io-client';

const useChatSocket = (roomId, username) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const { isConnected, roomName } = useSelector((state) => state.socket); // Получаем имя комнаты из Redux
  const { messages } = useSelector((state) => state.chat);

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');
    const socket = socketRef.current;

    if (roomId) {
      dispatch(setRoomId(roomId));
      socket.emit('join room', roomId); 
    }

    socket.on('connect', () => {
      dispatch(setConnectionStatus(true));
    });

    socket.on('disconnect', () => {
      dispatch(setConnectionStatus(false));
    });

    socket.on('chat history', (history) => {
      dispatch(setMessages(history));
    });

    socket.on('chat message', (newMessage) => {
      dispatch(addMessage(newMessage));
    });

    return () => {
      socket.disconnect();
    };
  }, [roomId, username, roomName, dispatch]);  // Теперь roomName тоже в зависимости

  const sendMessage = (message) => {
    if (message.trim()) {
      socketRef.current.emit('chat message', { message, username, roomId });  // Используем roomName
    }
  };

  return { isConnected, messages, sendMessage };
};

export default useChatSocket;
