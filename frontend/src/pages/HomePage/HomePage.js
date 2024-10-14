import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';  // Подключаем CSS файл
import { useDispatch } from 'react-redux';
import { setRoomName, setUsername } from '../../store/socketSlice'; // Импорт действий из Redux

const HomePage = () => {
  const [roomName, setRoomNameInput] = useState('');
  const [username, setUsernameInput] = useState('');
  const [savedRoomNames, setSavedRoomNames] = useState([]);
  const [savedUsernames, setSavedUsernames] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const dispatch = useDispatch();  // Инициализируем диспетчер Redux

  useEffect(() => {
    const storedRoomNames = JSON.parse(localStorage.getItem('roomNames')) || [];
    const storedUsernames = JSON.parse(localStorage.getItem('usernames')) || [];
    setSavedRoomNames(storedRoomNames);
    setSavedUsernames(storedUsernames);
  }, []);

  const saveRoomName = (newRoomName) => {
    let updatedRoomNames = [...savedRoomNames];
    if (!updatedRoomNames.includes(newRoomName)) {
      updatedRoomNames.push(newRoomName);
      localStorage.setItem('roomNames', JSON.stringify(updatedRoomNames));
      setSavedRoomNames(updatedRoomNames);
    }
  };

  const saveUsername = (newUsername) => {
    let updatedUsernames = [...savedUsernames];
    if (!updatedUsernames.includes(newUsername)) {
      updatedUsernames.push(newUsername);
      localStorage.setItem('usernames', JSON.stringify(updatedUsernames));
      setSavedUsernames(updatedUsernames);
    }
  };

  const joinRoom = async (e) => {
    e.preventDefault();
    if (roomName.trim() && username.trim()) {
      try {
        setError('');
        // Отправляем запрос на сервер для получения roomId по названию комнаты
        const response = await fetch(`/api/room?roomName=${roomName}`);
        const data = await response.json();
        
        if (data.roomId) {
          saveRoomName(roomName);
          saveUsername(username);
          
          // Сохраняем имя комнаты и имя пользователя в Redux
          dispatch(setRoomName(roomName));
          dispatch(setUsername(username));
          
          // Переходим в комнату с найденным roomId
          navigate(`/room/${data.roomId}`, { state: { username } });
        } else {
          setError('Room not found');
        }
      } catch (err) {
        console.error(err);
        setError('Error fetching room ID');
      }
    } else {
      setError('Please enter both Room Name and Username');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="header">Enter Room Name and Username</h1>
        <form className="form" onSubmit={joinRoom}>
          <select className="select" value={roomName} onChange={(e) => setRoomNameInput(e.target.value)}>
            <option value="">Select or Enter Room Name</option>
            {savedRoomNames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="text"
            value={roomName}
            onChange={(e) => setRoomNameInput(e.target.value)}
            placeholder="Room Name"
          />

          <select className="select" value={username} onChange={(e) => setUsernameInput(e.target.value)}>
            <option value="">Select or Enter Username</option>
            {savedUsernames.map((name, index) => (
              <option key={index} value={name}>
                {name}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="text"
            value={username}
            onChange={(e) => setUsernameInput(e.target.value)}
            placeholder="Username"
          />

          <button className="button" type="submit">Join Room</button>
        </form>
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default HomePage;
