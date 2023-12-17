// src/store/slices/expenseSlice.js
import { createSlice } from '@reduxjs/toolkit';

const expenseSlice = createSlice({
  name: 'expenses',
  initialState: {
    list:[],
    premiumActivated : false,
  },
  reducers: {
    addExpense: (state, action) => {
      state.list.push(action.payload);
    },
    deleteExpense: (state, action) => {
     state.list = state.list.filter(expense => expense.id !== action.payload);
    },
    activatePremium: (state) => {
      state.premiumActivated = true;
    },
    // Add other reducer logic as needed
  },
});

export const { addExpense, deleteExpense, activatePremium } = expenseSlice.actions;
export default expenseSlice.reducer;
