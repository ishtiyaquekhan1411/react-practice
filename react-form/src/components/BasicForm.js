import useInput from "../hooks/use-input";
const BasicForm = (props) => {
  const {
    value: enteredFirstName,
    hasError: hasFirstNameError,
    isInputValid: isFirstNameInputValid,
    valueChangeHandler: firstNameChangeHandler,
    inputBlurHandler: firstNameBlurHandler,
    reset: resetFirstName
  } = useInput(value => value.trim() !== '');

  const {
    value: enteredEmail,
    hasError: hasEmailError,
    isInputValid: isEmailInputValid,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmail
  } = useInput(value => value.includes('@'));

  const {
    value: enteredLastName,
    hasError: hasLastNameError,
    isInputValid: isLastNameInputValid,
    valueChangeHandler: lastNameChangeHandler,
    inputBlurHandler: lastNameBlurHandler,
    reset: resetLastName
  } = useInput(value => value.trim() !== '');

  let isFormValid = false;

  if (isFirstNameInputValid && isEmailInputValid && isLastNameInputValid) {
    isFormValid = true
  }

  const formSubmitHandler = (event) => {
    event.preventDefault();

    resetFirstName();
    resetLastName();
    resetEmail();
  }

  const firstNameInputClasses = hasFirstNameError ? 'form-control invalid' : 'form-control';
  const lastNameInputClasses = hasLastNameError ? 'form-control invalid' : 'form-control';
  const emailInputClasses = hasEmailError ? 'form-control invalid' : 'form-control';

  return (
    <form onSubmit={formSubmitHandler}>
      <div className='control-group'>
        <div className={firstNameInputClasses}>
          <label htmlFor='name'>First Name</label>
          <input
            type='text'
            id='name'
            onChange={firstNameChangeHandler}
            onBlur={firstNameBlurHandler} 
            value={enteredFirstName}
          />
          {hasFirstNameError && <p className='error-text'>First Name is Invalid</p>}
        </div>
        <div className={lastNameInputClasses}>
          <label htmlFor='name'>Last Name</label>
          <input
            type='text'
            id='name'
            onChange={lastNameChangeHandler}
            onBlur={lastNameBlurHandler}
            value={enteredLastName}
          />
          {hasLastNameError && <p className='error-text'>Last Name is Invalid</p>}
        </div>
      </div>
      <div className={emailInputClasses}>
        <label htmlFor='name'>E-Mail Address</label>
        <input
          type='text'
          id='name'
          onChange={emailChangeHandler}
          onBlur={emailBlurHandler}
          value={enteredEmail}
        />
        {hasEmailError && <p className='error-text'>Email is Invalid</p>}
      </div>
      <div className='form-actions'>
        <button disabled={!isFormValid}>Submit</button>
      </div>
    </form>
  );
};

export default BasicForm;
