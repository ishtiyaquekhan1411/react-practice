import React from 'react';
import ExpenseItem from './ExpenseItem';
import './ExpenseList.css';

const ExpenseList = (props) => {
  if (props.items.length === 0) {
    return (<p>No Expense found</p>)
  }

  return (
    props.items.map(item => (
        <ExpenseItem
          key={item.id}
          id={item.id}
          title={item.title}
          amount={item.amount}
          date={item.date}
          onRemoveExpenseData={props.onRemoveExpenseData}
          onEditExpenseData={props.onEditExpenseData}
          url={item.url}
        />
    ))
  )
}

export default ExpenseList;