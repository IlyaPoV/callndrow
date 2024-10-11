import React from 'react';
import Chat from './Chat';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import useChatSocket from '../hooks/useChatSocket';

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
    <div style={styles.container}>
      <h1 style={styles.header}>Chat Room</h1>
      <p style={styles.welcome}>Welcome, {username}</p>
      <div style={styles.chatContainer}>
        <Chat
          messages={messages}
          sendMessage={sendMessage}
          isConnected={isConnected}
          currentUser={username}
        />
        {!isConnected && <p style={styles.reconnect}>Reconnecting...</p>}
      </div>
      <button onClick={handleBackToHome} style={styles.backButton}>
        Back to Home
      </button>
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
    backgroundColor: '#f1f1f1',
    padding: '20px', // Добавляем padding для пространства
    boxSizing: 'border-box', // Гарантируем, что padding учитывается в расчете ширины и высоты
  },
  header: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  welcome: {
    fontSize: '18px',
    marginBottom: '20px',
  },
  chatContainer: {
    flexGrow: 1, // Занимает доступное пространство
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  reconnect: {
    color: 'red',
    fontSize: '14px',
    marginTop: '10px',
  },
  backButton: {
    marginTop: '20px',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '16px',
    alignSelf: 'center', // Центрируем кнопку
  },
};

export default ChatRoom;
