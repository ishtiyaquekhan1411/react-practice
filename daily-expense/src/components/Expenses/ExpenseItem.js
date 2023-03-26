import React from 'react';

import ExpenseDate from './ExpenseDate';
import Card from '../UI/Card';
import './ExpenseItem.css';

const ExpenseItem = (props) => {
  const removeHandler = (event) => {
    event.preventDefault();

    props.onRemoveExpenseData(props.id)
  }

  const editHandler = (event) => {
    event.preventDefault();

    props.onEditExpenseData(props.id)
  }

  return (
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        {props.url && <img src={props.url} alt='' /> }
        <div className='expense-item__price'>${props.amount}</div>
      </div>
      <button onClick={editHandler}>Edit</button>
      <button onClick={removeHandler}>Remove</button>
    </Card>
  );
}

export default ExpenseItem;
