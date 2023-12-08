import React, { useState, useContext,useEffect } from 'react';
import ExpenseList from './ExpenceList';
import { ExpenseContext } from '../../store/ExpenseContext'; // Create ExpenseContext

const ExpenseTracker = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const { expenses, addExpense } = useContext(ExpenseContext); // Use ExpenseContext

  const submitHandler = async(e) => {
    e.preventDefault();

    // Validate inputs
    if (!amount || !description || !category) {
      alert('Please fill in all fields');
      return;
    }
    const url = 'https://expanse-tracker-2f5d9-default-rtdb.firebaseio.com/expense.json';
    // Add expense
    try {
      const response = await fetch(url, {
        method: 'POST',
        body: JSON.stringify({ amount, description, category }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to add expense');
      }

      const data = await response.json();
      console.log('Expense added successfully:', data);

      // Update local state with the new expense
      addExpense({ amount, description, category });

      // Clear the form
      setAmount('');
      setDescription('');
      setCategory('');
    } catch (error) {
      console.error('Error adding expense:', error.message);
    }
  
  };
  useEffect(() => {
    const fetchExpenses = async () => {
      // Make API call to get expenses from Firebase
      const url = 'https://expanse-tracker-2f5d9-default-rtdb.firebaseio.com/expenses.json'; // Replace with your Firebase database URL

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();

        // Transform data into an array of expenses
        addExpense({ amount, description, category });
      } catch (error) {
        console.error('Error fetching expenses:', error.message);
      }
    };

    fetchExpenses();
  }, []); // Empty dependency array ensures this effect runs only once on mount


  return (
    <div>
      <h2>Expense Tracker</h2>
      <form>
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
        <button onClick={submitHandler}>Add Expense</button>
      </form>

      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default ExpenseTracker;
