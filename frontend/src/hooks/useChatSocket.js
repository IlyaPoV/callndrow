import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setConnectionStatus, setRoomId, setUsername } from '../store/socketSlice';
import { addMessage, setMessages } from '../store/chatSlice';
import io from 'socket.io-client';

const useChatSocket = (roomId, username) => {
  const dispatch = useDispatch();
  const socketRef = useRef(null);
  const { isConnected } = useSelector((state) => state.socket); // Получаем состояние соединения из Redux
  const { messages } = useSelector((state) => state.chat); // Получаем сообщения из Redux

  useEffect(() => {
    socketRef.current = io('http://localhost:4000');
    const socket = socketRef.current;

    if (roomId && username) {
      dispatch(setRoomId(roomId));
      dispatch(setUsername(username));
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
  }, [roomId, username, dispatch]);

  const sendMessage = (message) => {
    if (message.trim()) {
      socketRef.current.emit('chat message', { message, username, roomId });
    }
  };

  return { isConnected, messages, sendMessage };
};

export default useChatSocket;
