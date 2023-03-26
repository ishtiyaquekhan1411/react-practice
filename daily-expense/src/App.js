import React, { useState } from 'react';

import Expenses from './components/Expenses/Expenses';
import ExpenseForm from './components/ExpenseForm/ExpenseForm';
import { EXPENSES } from './constants';

const App = () => {
  const [expenses, setExpenses] = useState(EXPENSES);
  const [currentExpense, setCurrentExpense] = useState({});

  const addUpdateExpenseHandler = (item) => {
    const itemIndex = expenses.findIndex((expense) => expense.id === item.id);
    if (itemIndex !== -1) {
      expenses[itemIndex] = item
      setExpenses(expenses);
    } else {
      setExpenses(prevState => ([...prevState, item]));
    }
    setCurrentExpense({});
  };

  const removeExpenseHandler = (itemId) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== itemId);
    setExpenses([...updatedExpenses]);
    setCurrentExpense({});
  };

  const editExpenseHandler = (itemId) => {
    const currentExpense = expenses.find((expense) => expense.id === itemId);
    setCurrentExpense(currentExpense);
  }

  const resetCurrentExpenseHandler = () => setCurrentExpense({})

  return (
    <div>
      <ExpenseForm
        onAddUpdateExpense={addUpdateExpenseHandler}
        expense={currentExpense}
        onCancel={resetCurrentExpenseHandler}
      />
      <Expenses
        items={expenses}
        onRemoveExpenseData={removeExpenseHandler}
        onEditExpenseData={editExpenseHandler}
      />
    </div>
  );
}

export default App;
