import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './HomePage.css';  // Подключаем CSS файл

const HomePage = () => {
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');
  const [savedRoomIds, setSavedRoomIds] = useState([]);
  const [savedUsernames, setSavedUsernames] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedRoomIds = JSON.parse(localStorage.getItem('roomIds')) || [];
    const storedUsernames = JSON.parse(localStorage.getItem('usernames')) || [];
    setSavedRoomIds(storedRoomIds);
    setSavedUsernames(storedUsernames);
  }, []);

  const saveRoomId = (newRoomId) => {
    let updatedRoomIds = [...savedRoomIds];
    if (!updatedRoomIds.includes(newRoomId)) {
      updatedRoomIds.push(newRoomId);
      localStorage.setItem('roomIds', JSON.stringify(updatedRoomIds));
      setSavedRoomIds(updatedRoomIds);
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

  const joinRoom = (e) => {
    e.preventDefault();
    if (roomId.trim() && username.trim()) {
      setError('');
      saveRoomId(roomId);
      saveUsername(username);
      navigate(`/room/${roomId}`, { state: { username } });
    } else {
      setError('Please enter both Room ID and Username');
    }
  };

  return (
    <div className="container">
      <div className="form-container">
        <h1 className="header">Enter Room ID and Username</h1>
        <form className="form" onSubmit={joinRoom}>
          <select className="select" value={roomId} onChange={(e) => setRoomId(e.target.value)}>
            <option value="">Select or Enter Room ID</option>
            {savedRoomIds.map((id, index) => (
              <option key={index} value={id}>
                {id}
              </option>
            ))}
          </select>

          <input
            className="input"
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Room ID"
          />

          <select className="select" value={username} onChange={(e) => setUsername(e.target.value)}>
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
            onChange={(e) => setUsername(e.target.value)}
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
