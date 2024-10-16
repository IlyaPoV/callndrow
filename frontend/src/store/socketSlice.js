import { createSlice } from '@reduxjs/toolkit';

const socketSlice = createSlice({
  name: 'socket',
  initialState: {
    isConnected: false,
    roomId: null,
    roomName: null,
    username: null,
  },
  reducers: {
    setConnectionStatus: (state, action) => {
      state.isConnected = action.payload;
    },
    setRoomId: (state, action) => {
      state.roomId = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setRoomName: (state, action) => {
      state.roomName = action.payload;
    },
    clearConnection: (state) => {
      state.isConnected = false;
      state.roomId = null;
      state.username = null;
    },
  },
});

export const { setConnectionStatus, setRoomId, setRoomName, setUsername, clearConnection } = socketSlice.actions;
export default socketSlice.reducer;
