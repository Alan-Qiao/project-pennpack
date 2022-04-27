import { configureStore } from '@reduxjs/toolkit';
import classListReducer from './classListSlice';

const store = configureStore({
  reducer: {
    classList: classListReducer,
  },
});

export default store;
