import { configureStore } from '@reduxjs/toolkit';
import chatReducer from './chatSlice';
import socketReducer from './socketSlice';

const store = configureStore({
  reducer: {
    chat: chatReducer,
    socket: socketReducer,
  },
});

export default store;
