import { configureStore } from '@reduxjs/toolkit';
import socketReducer from './socketSlice';
import chatReducer from './chatSlice';

// Функция для сохранения состояния в localStorage
function saveToLocalStorage(state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('reduxState', serializedState);
  } catch (e) {
    console.warn("Could not save state", e);
  }
}

// Функция для загрузки состояния из localStorage
function loadFromLocalStorage() {
  try {
    const serializedState = localStorage.getItem('reduxState');
    if (serializedState === null) return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    console.warn("Could not load state", e);
    return undefined;
  }
}

// Загружаем состояние из localStorage при инициализации Redux
const preloadedState = loadFromLocalStorage();

const store = configureStore({
  reducer: {
    socket: socketReducer,
    chat: chatReducer,
  },
  preloadedState,  // Передаем загруженное состояние при создании хранилища
});

// Подписка на изменения в хранилище Redux для сохранения в localStorage
let currentSocketState;

store.subscribe(() => {
  const previousSocketState = currentSocketState;
  currentSocketState = store.getState().socket;

  if (previousSocketState !== currentSocketState) {
    saveToLocalStorage({
      socket: currentSocketState,
    });
  }
});

export default store;
