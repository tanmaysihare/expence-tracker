import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-Reducer";
import expenseReducer from "./expense-Reducer";

const store = configureStore({
    reducer: {
      expenses: expenseReducer,
      auth: authReducer,
    },
  });
  
  export default store;