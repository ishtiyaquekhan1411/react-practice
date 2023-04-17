import classes from './InputField.module.css';

const InputField = (props) => {
  const {
    label,
    type,
    name,
    handleChange,
    handleBlur,
    errorMessage,
    isValid,
    value,
    touched
  } = props;

  const isInValidField = !isValid && (errorMessage && touched);
  const fieldClasses = isInValidField ? `${classes.inputContainer} ${classes.invalid}` : classes.inputContainer;

  return (
    <div className={fieldClasses}>
      <label htmlFor={name}>{label}</label>
      <input id={name} type={type} name={name} value={value} onChange={handleChange} onBlur={handleBlur} />
      {
        isInValidField && (
          <span className={classes.error}>{errorMessage}</span>
        )
      }
    </div>
  )
}

export default InputField;