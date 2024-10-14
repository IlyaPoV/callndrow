import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import useChatSocket from '../../hooks/useChatSocket';
import Chat from '../../components/Chat/Chat';
import {saveToLocalStorage, saveUsernameToLocalStorage} from '../../utils/localStorageUtils';
import './ChatRoom.css';
import { useSelector, useDispatch } from 'react-redux';
import { setRoomName, setUsername } from '../../store/socketSlice'; // Импортируем action для установки username

const ChatRoom = () => {
  const { roomId } = useParams();
  const roomName = useSelector(state => state.socket.roomName);
  const username = useSelector(state => state.socket.username);
  const [inputUsername, setInputUsername] = useState(''); // Локальное состояние для имени пользователя
  const [isUsernameSet, setIsUsernameSet] = useState(!!username); // Флаг для проверки, установлено ли имя
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchRoomName = useCallback(async (roomId) => {
    try {
      const response = await axios.get(`/api/room/name/${roomId}`); // Запрос на сервер
      const { roomName } = response.data;
      dispatch(setRoomName(roomName)); // Сохраняем имя комнаты в Redux
    } catch (error) {
      console.error("Error fetching room name:", error);
    }
  },[dispatch]);

  // Функция для установки имени пользователя и отображения чата
  const handleSetUsername = () => {
    if (inputUsername.trim()) {
      dispatch(setUsername(inputUsername.trim()));
      saveUsernameToLocalStorage(inputUsername.trim());
      setIsUsernameSet(true); // Устанавливаем флаг, что имя введено
    }
  };
  
  // Проверяем, есть ли username, и если нет, генерируем случайное имя
  useEffect(() => {
    if (!roomName) {
      fetchRoomName(roomId);
    }

    if (!username) {
      const randomUsernames = ['User123', 'ChatMaster', 'GuestUser', 'CoolChatter', 'RandomTalker', 'MysteryUser'];
      const randomUsername = randomUsernames[Math.floor(Math.random() * randomUsernames.length)];
      dispatch(setUsername(randomUsername));
    }
  }, [username, dispatch, fetchRoomName, roomId, roomName]);

  const { isConnected, messages, sendMessage } = useChatSocket(roomId, username);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="chat-room-container">
      {!isUsernameSet ? (
        <div className="username-input-container">
          <h2>Please enter your username:</h2>
          <input
            type="text"
            value={inputUsername}
            onChange={(e) => setInputUsername(e.target.value)}
            placeholder="Enter your username"
          />
          <button onClick={handleSetUsername}>Join Chat</button>
        </div>
      ) : (
        <>
          <h1 className="chat-room-header">Chat Room: {roomName}</h1>
          <p className="chat-room-welcome">Welcome, {username}</p>
          <div className="chat-room-chat-container">
            <Chat
              messages={messages}
              sendMessage={sendMessage}
              isConnected={isConnected}
              currentUser={username}
            />
            {!isConnected && <p className="chat-room-reconnect">Reconnecting...</p>}
          </div>
          <button onClick={handleBackToHome} className="chat-room-back-button">
            Back to Home
          </button>
        </>
      )}
    </div>
  );
};

export default ChatRoom;
