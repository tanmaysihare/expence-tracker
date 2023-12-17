import React from 'react';

const ExpenseList = ({ expenses, deleteExpenseHandler, editExpenseHandler }) => {
  return (
    <div>
      <h3>Expense List</h3>
      <ul>
        {Array.isArray(expenses[0])
          ? expenses[0].map((expense) => (
              <li key={expense.id}>
                <strong>Amount:</strong> {expense.amount}, <strong>Description:</strong> {expense.description},{' '}
                <strong>Category:</strong> {expense.category}
                <button onClick={() => editExpenseHandler(expense.id)}>Edit</button>
                <button onClick={() => deleteExpenseHandler(expense.id)}>Delete</button>
              </li>
            ))
          : expenses.map((expense) => (
              <li key={expense.id} >
                <strong>Amount:</strong> {expense.amount}, <strong>Description:</strong> {expense.description},{' '}
                <strong>Category:</strong> {expense.category}
                <button onClick={() => editExpenseHandler(expense.id)}>Edit</button>
                <button onClick={() => deleteExpenseHandler(expense.id)}>Delete</button>
              </li>
            ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
