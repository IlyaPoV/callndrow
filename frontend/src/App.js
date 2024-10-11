import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux'; // Импортируем Provider
import HomePage from './pages/HomePage';
import ChatRoom from './pages/ChatRoom';
import store from './store/store'; // Импортируем store

const App = () => {
  return (
    <Provider store={store}> {/* Оборачиваем приложение в Provider */}
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/room/:roomId" element={<ChatRoom />} />
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
