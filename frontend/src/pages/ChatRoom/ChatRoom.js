import React from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useChatSocket from '../../hooks/useChatSocket';
import Chat from '../../components/Chat/Chat';
import './ChatRoom.css'; // Подключаем CSS файл

const ChatRoom = () => {
  const { roomId } = useParams();
  const location = useLocation();
  const username = location.state?.username || 'User';
  const navigate = useNavigate();

  const { isConnected, messages, sendMessage } = useChatSocket(roomId, username);

  const handleBackToHome = () => {
    navigate('/');
  };

  return (
    <div className="chat-room-container">
      <h1 className="chat-room-header">Chat Room {roomId}</h1>
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
    </div>
  );
};

export default ChatRoom;
