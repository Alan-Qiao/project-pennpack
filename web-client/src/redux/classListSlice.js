import { createSlice } from '@reduxjs/toolkit';
/* List of Class references to Classes that the User is enrolled in */
export const classListSlice = createSlice({
  name: 'classList',
  initialState: {
    list: [],
  },
  reducers: {
    addClass: (state, action) => {
      state.list.push(action.payload);
    },
    removeClass: (state, action) => (state.list.filter(c => c.id === action.payload.id)),
    setClassList: (state, action) => {
      state.list = action.payload;
    },
  },
});

export const {
  addClass,
  removeClass,
  setClassList,
} = classListSlice.actions;
export const selectClassList = state => state.classList.list;
export default classListSlice.reducer;
