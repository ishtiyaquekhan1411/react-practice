import React, { useState } from 'react';
import Card from '../UI/Card';
import ExpenseFilter from './ExpenseFilter';
import ExpenseChart from './ExpenseChart';
import ExpenseList from './ExpenseList';
import './Expenses.css';

const Expenses = (props) => {
  const [filterSelect, setFilterSelect] = useState('');

  const changeFilterHandler = (filterYear) => setFilterSelect(filterYear);

  const clearFilterHandler = () => setFilterSelect('');

  const filterItems = props.items.filter((item) => {
    return (filterSelect === '') ? true : item.date.getFullYear().toString() === filterSelect
  });

  return (
    <Card className="expenses">
      { props.items.length > 0 &&
        <>
          <ExpenseFilter
            selected={filterSelect}
            onChangeFilter={changeFilterHandler}
            onClearFilter={clearFilterHandler}
          />
          <ExpenseChart expenses={filterItems} />
        </>
      }
      <ExpenseList
        items={filterItems}
        onRemoveExpenseData={props.onRemoveExpenseData}
        onEditExpenseData={props.onEditExpenseData}
      />
    </Card>
  )
}

export default Expenses;
