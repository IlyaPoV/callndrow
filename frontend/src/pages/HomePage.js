import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [error, setError] = useState(''); // Для отображения ошибок при неверном вводе
  const navigate = useNavigate();

  const joinRoom = (e) => {
    e.preventDefault(); // Предотвращаем перезагрузку страницы
    if (roomId.trim() && username.trim()) {
      setError(''); // Сбрасываем ошибку
      navigate(`/room/${roomId}`, { state: { username } });
    } else {
      setError('Please enter both Room ID and Username'); // Устанавливаем ошибку, если данные не заполнены
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.formContainer}>
        <h1 style={styles.header}>Enter Room ID and Username</h1>
        <form onSubmit={joinRoom} style={styles.form}>
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
          <button type="submit" style={styles.button}>
            Join Room
          </button>
        </form>
        {error && <p style={styles.error}>{error}</p>} {/* Отображаем ошибку, если данные неверны */}
      </div>
    </div>
  );
};

// Стили
const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    backgroundColor: '#f1f1f1',
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '40px',
    backgroundColor: '#fff',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
  },
  input: {
    padding: '10px',
    margin: '10px 0',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    width: '100%',
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '10px',
    fontSize: '16px',
    width: '100%',
  },
  error: {
    color: 'red',
    marginTop: '10px',
    fontSize: '14px',
  },
};

export default HomePage;
