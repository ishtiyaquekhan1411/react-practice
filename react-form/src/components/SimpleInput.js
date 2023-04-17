import useInput from '../hooks/use-input';

const SimpleInput = (props) => {
  const {
    value: enteredName,
    isInputValid: isNameValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameInputChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    isInputValid: isEmailValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailInputChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput
  } = useInput(value => value.includes('@'));

  let formIsValid = false;

  if (isNameValid && isEmailValid) {
    formIsValid = true;
  }

  const formSubmitHandler = event => {
    event.preventDefault();

    if (!enteredName) return;

    resetNameInput();
    resetEmailInput();
  }

  const nameInputClasses = nameInputHasError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = emailInputHasError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitHandler} >
      <div className={nameInputClasses}>
        <label htmlFor='name'>Your Name</label>
        <input
          type='text'
          id='name'
          onChange={nameInputChangeHandler}
          onBlur={nameBlurHandler}
          value={enteredName}
        />
        {nameInputHasError && <p className='error-text'>Name input is invalid!</p>}
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>Your Email</label>
        <input
          type='email'
          id='name'
          onChange={emailInputChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {emailInputHasError && <p className='error-text'>Email input is invalid!</p>}
      </div>
      <div className="form-actions">
        <button disabled={!formIsValid}>Submit</button>
      </div>
    </form>
  );
};

export default SimpleInput;
