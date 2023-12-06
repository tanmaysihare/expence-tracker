import React, { useState, useContext } from 'react';
import ExpenseList from './ExpenceList';
import { ExpenseContext } from '../../store/ExpenseContext'; // Create ExpenseContext

const ExpenseTracker = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const { expenses, addExpense } = useContext(ExpenseContext); // Use ExpenseContext

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate inputs
    if (!amount || !description || !category) {
      alert('Please fill in all fields');
      return;
    }

    // Add expense
    addExpense({ amount, description, category });

    // Clear form fields
    setAmount('');
    setDescription('');
    setCategory('');
  };

  return (
    <div>
      <h2>Expense Tracker</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Amount:
          <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Category:
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="">Select Category</option>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            {/* Add more categories as needed */}
          </select>
        </label>
        <button type="submit">Add Expense</button>
      </form>

      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default ExpenseTracker;
