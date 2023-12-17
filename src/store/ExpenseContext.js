import React, { createContext, useReducer } from 'react';

export const ExpenseContext = createContext();

const expenseReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_EXPENSE':
      return [...state, action.payload];
    case 'DELETE_EXPENSE':
      return state.filter((_, index) => index !== action.payload);
    case 'EDIT_EXPENSE':
      return state.map((expense, index) =>
          index === action.payload.index ? action.payload.updatedExpense : expense
        );
    default:
      return state;
  }
};

export const ExpenseProvider = ({ children }) => {
  const [expenses, dispatch] = useReducer(expenseReducer, []);

  const addExpense = (expense) => {
    dispatch({ type: 'ADD_EXPENSE', payload: expense });
  };
  const deleteExpense = (index) => {
    dispatch({ type: 'DELETE_EXPENSE', payload: index });
  };

  const editExpense = (index, updatedExpense) => {
    dispatch({ type: 'EDIT_EXPENSE', payload: { index, updatedExpense } });
  };

  return (
    <ExpenseContext.Provider value={{ expenses, addExpense, deleteExpense, editExpense  }}>
      {children}
    </ExpenseContext.Provider>
  );
};
