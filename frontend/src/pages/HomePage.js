import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const joinRoom = () => {
    if (roomId.trim() && username.trim()) {
      // Передаем имя пользователя вместе с roomId в URL, можно использовать query-параметры или state
      navigate(`/room/${roomId}`, { state: { username } });
    } else {
      alert("Please enter both Room ID and Username");
    }
  };

  return (
    <div style={styles.container}>
      <h1>Enter Room ID and Username</h1>
      <input
        type="text"
        value={roomId}
        onChange={(e) => setRoomId(e.target.value)}
        placeholder="Room ID"
        style={styles.input}
      />
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="Username"
        style={styles.input}
      />
      <button onClick={joinRoom} style={styles.button}>
        Join Room
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
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
  },
  button: {
    padding: '10px 20px',
    fontSize: '16px',
    cursor: 'pointer',
  },
};

export default HomePage;
