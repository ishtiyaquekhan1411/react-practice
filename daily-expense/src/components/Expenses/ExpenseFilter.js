import React from 'react';
import './ExpenseFilter.css';
import { YEARS } from '../../constants';

const ExpenseFilter = (props) => {
  const dropDownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  }

  return (
    <div className="expense-filters">
      <div className="expense-filter">
        <label>Filter by Year</label>
        <div>
          {
            <select value={props.selected} onChange={dropDownChangeHandler}>
              {!props.selected && <option value=''></option>}
              {YEARS.map((year, index) => <option key={index} value={year}>{year}</option>)}
            </select>
          }
          { props.selected && <button onClick={props.onClearFilter}>Clear Filter</button> }
        </div>
      </div>
    </div>
  )
}

export default ExpenseFilter;