import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div>
      <h3>Expense List</h3>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            <strong>Amount:</strong> {expense.amount}, <strong>Description:</strong> {expense.description},{' '}
            <strong>Category:</strong> {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
