import { createSlice } from '@reduxjs/toolkit';

export const currentUserSlice = createSlice({
  name: 'user',
  initialState: {
    name: '',
    username: '',
    password: '',
  },
  reducers: {
    updateName: (state, action) => {
      state.name = action.payload;
    },
    updateUsername: (state, action) => {
      state.username = action.payload;
    },
    updatePassword: (state, action) => {
      state.password = action.payload;
    },
    resetCurrentUser: () => ({ name: '', username: '', password: '' }),
  },
});

export const {
  updateName,
  updateUsername,
  updatePassword,
  resetCurrentUser,
} = currentUserSlice.actions;
export const selectCurrentUser = state => state.user;
export default currentUserSlice.reducer;
