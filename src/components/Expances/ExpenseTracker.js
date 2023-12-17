import React, { useState, useContext, useEffect } from 'react';
import ExpenseList from './ExpenceList';
import { ExpenseContext } from '../../store/ExpenseContext';

const ExpenseTracker = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editExpenseId, setEditExpenseId] = useState(null);
  const { expenses, addExpense, deleteExpense, editExpense } = useContext(ExpenseContext);

  const submitHandler = async (e) => {
    e.preventDefault();

    if (!amount || !description || !category) {
      alert('Please fill in all fields');
      return;
    }

    if (editExpenseId) {
      editExpenseHandler(editExpenseId, { amount, description, category });
      setEditExpenseId(null);
    } else {
      const url = 'https://expanse-tracker-2f5d9-default-rtdb.firebaseio.com/expense.json';
      function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min) + min);
      }
      let indexId = getRandomInt(1,1000000);      
      try {
        const response = await fetch(url, {
          method: 'POST',
          body: JSON.stringify({ id:indexId,amount, description, category }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to add expense');
        }

        const data = await response.json();
        console.log('Expense added successfully:', data);

        addExpense({ amount, description, category });

        setAmount('');
        setDescription('');
        setCategory('');
      } catch (error) {
        console.error('Error adding expense:', error.message);
      }
    }
  };

  const deleteExpenseHandler = async (id) => {
    try {
      const url = `https://expanse-tracker-2f5d9-default-rtdb.firebaseio.com/expense/${id}.json`;
      const response = await fetch(url, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete expense');
      }

      console.log('Expense successfully deleted',id);
      deleteExpense(id);
    } catch (error) {
      console.error('Error deleting expense:', error.message);
    }
  };

  const editExpenseHandler = async (expenseId, updatedExpense) => {
    try {
      const url = `https://expanse-tracker-2f5d9-default-rtdb.firebaseio.com/expense/${expenseId}.json`;
      const response = await fetch(url, {
        method: 'PUT',
        body: JSON.stringify(updatedExpense),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to edit expense');
      }

      console.log('Expense successfully edited');
      editExpense(expenseId, updatedExpense);
     setEditExpenseId(null);
    } catch (error) {
      console.error('Error editing expense:', error.message);
    }
  };

  useEffect(() => {
    const fetchExpenses = async () => {
      const url = 'https://expanse-tracker-2f5d9-default-rtdb.firebaseio.com/expense.json';

      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Failed to fetch expenses');
        }

        const data = await response.json();
        const loadedExpenses = data ? Object.values(data) : [];

        addExpense(loadedExpenses);
      } catch (error) {
        console.error('Error fetching expenses:', error.message);
      }
    };

    fetchExpenses();
  }, []);

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
          </select>
        </label>
        <button type="button" onClick={submitHandler}>
          {editExpenseId ? 'Update Expense' : 'Add Expense'}
        </button>
      </form>

      <ExpenseList
        expenses={expenses}
        deleteExpenseHandler={deleteExpenseHandler}
        editExpenseHandler={setEditExpenseId}
      />
    </div>
  );
};

export default ExpenseTracker;
