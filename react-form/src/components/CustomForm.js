import React from 'react';
import useForm from '../hooks/use-form';
import { SignUpForm } from '../utils/forms/SignUpForm';
import classes from './CustomForm.module.css';

const CustomForm = () => {
  const { renderFormFields, isFormValid } = useForm(SignUpForm);
  const formFields = renderFormFields();

  return (
    <form className={classes.signupForm}>
      <h1>Sign Up</h1>

      {formFields}

      <button disabled={!isFormValid()} type="submit">Submit</button>
    </form>
  );
}

export default CustomForm;