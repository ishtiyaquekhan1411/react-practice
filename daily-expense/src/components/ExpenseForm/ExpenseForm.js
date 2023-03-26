import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { TITLE_REGEX, NUMBER_REGEX } from '../../constants'
import Card from '../UI/Card';
import './ExpenseForm.css';

const ExpenseForm = (props) => {

  console.log(props);

  const initialUserInput = {
    enteredTitle: '',
    enteredAmount: '',
    enteredDate: '',
    imageUrl: ''
  };

  const [userInput, setUserInput] = useState(initialUserInput);
  const [userInputError, setuserInputError] = useState(initialUserInput);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (props.expense.id) {
      setUserInput({
        enteredTitle: props.expense.title,
        enteredAmount: props.expense.amount,
        enteredDate: props.expense.date.toISOString().slice(0, 10),
        imageUrl: props.expense.url
      })
      setIsEditing(true);
    }
  }, [props.expense])

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setUserInput(prevState => ({ ...prevState, [name]: value }));
  }

  const uploadImageHandler = async (event) => {
    event.preventDefault();

    const data = new FormData();
    data.append('file', event.target.files[0]);
    data.append('upload_preset', 'j0j1j50n');
    data.append('cloud_name', 'dzjciizhx');
    const response = await fetch("https://api.cloudinary.com/v1_1/dzjciizhx/image/upload", {
      method: 'POST',
      body: data
    });
    const responseData = response.json();
    setUserInput(prevState => ({ ...prevState, imageUrl: responseData.url }));
  }
  
  const validateInput = () => {
    const errors = {...initialUserInput};
    Object.keys(errors).forEach((key) => {
      switch (key) {
        case 'enteredTitle':
          if (!TITLE_REGEX.test(userInput.enteredTitle)) {
            errors[key] = 'Invalid Title.'
          }
          break;
        case 'enteredAmount':
          if (!NUMBER_REGEX.test(userInput.enteredAmount)) {
            errors[key] = 'Invalid Amount.';
          }
          break;
        case 'enteredDate':
          if (isNaN(Date.parse(userInput.enteredDate))) {
            errors[key] = 'Invalid date';
          }
          break;
        default:
          errors[key] = '';
      }
    })
    return errors;
  }

  const submitHandler = (event) => {
    event.preventDefault();
    const errors = validateInput();
    const isValidSubmission = Object.values(errors).every(value => value === '');
    if (isValidSubmission) {
      const expenseData = {
        title: userInput.enteredTitle,
        amount: userInput.enteredAmount,
        date: new Date(userInput.enteredDate),
        url: userInput.imageUrl,
        id: props.expense.id || Math.random().toString()
      }
      props.onAddUpdateExpense(expenseData);
      setUserInput(initialUserInput);
      setuserInputError(initialUserInput);
    } else {
      setuserInputError(errors);
    }
  }

  const startEditingHandler = () => setIsEditing(true);
  const stopEditingHandler = () => {
    setIsEditing(false);
    props.onCancel();
  }

  return (
    <Card className='expense'>
      {
        (!props.expense.id && !isEditing) && (
          <div className='expense__actions'>
            <button onClick={startEditingHandler}>Add new Expense</button>
          </div>
        )
      }
      { isEditing &&
        <form onSubmit={submitHandler}>
        <div className='expense__controls'>
          <div className='expense__control'>
            <label htmlFor='title'>Title</label>
            <input
              className={ userInputError.enteredTitle && 'expense__input_error'}
              type='text'
              id='title'
              value={userInput.enteredTitle}
              name='enteredTitle'
              onChange={changeHandler}
            />
            {
              userInputError.enteredTitle && <span>{userInputError.enteredTitle}</span>
            }
          </div>
          <div className='expense__control'>
            <label htmlFor='amount'>Amount</label>
            <input
              className={ userInputError.enteredAmount && 'expense__input_error'}
              type='number'
              id='amount'
              value={userInput.enteredAmount}
              name='enteredAmount'
              min='0.01'
              step='0.01'
              onChange={changeHandler}
            />
            {
              userInputError.enteredAmount && <span>{userInputError.enteredAmount}</span>
            }
          </div>
          <div className='expense__control'>
          <label htmlFor='date'>Date</label>
            <input
              className={ userInputError.enteredDate && 'expense__input_error'}
              type='date'
              id='date'
              min='2021-01-01'
              max='2022-12-31'
              value={userInput.enteredDate}
              name='enteredDate'
              onChange={changeHandler}
            />
            {
              userInputError.enteredDate && <span>{userInputError.enteredDate}</span>
            }
          </div>
          <div className='expense__control'>
            <div className='expense__image'>
              <label className="expense__image-label">
                <input className="expense__input_error" type="file" onChange={uploadImageHandler} />
                <i className="fa fa-cloud-upload" /> Attach Image
              </label>
            </div>
          </div>
        </div>
        <div className='expense__actions'>
          <button onClick={stopEditingHandler}>Cancel</button>
          <button type='submit'>{props.expense.id ? 'Update Expense' : 'Add Expense'}</button>
        </div>
        </form>
      }
    </Card>
  ) 
}

export default ExpenseForm;

ExpenseForm.propTypes = {
  expense: PropTypes.shape({
    id: PropTypes.string.isRequired
  })
}