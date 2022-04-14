import { configureStore } from '@reduxjs/toolkit';
import currentUserReducer from './currentUserSlice';
import classListReducer from './classListSlice';

const store = configureStore({
  reducer: {
    user: currentUserReducer,
    classList: classListReducer,
  },
});

export default store;
