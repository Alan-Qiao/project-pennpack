import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';

const store = configureStore({
  reducer: {
    user: currentUserReducer,
  },
});

export default store;
