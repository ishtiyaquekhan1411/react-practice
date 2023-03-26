import InputField from "../../../UI/InputField";

const FormFieldConfig = (label, name, type, defaultValue = '') => {
  return {
    renderField: (handleChange, handleBlur, value, isValid, error, key, touched = false) => {
      return <InputField 
        key={key}
        name={name}
        type={type}
        label={label}
        isValid={isValid}
        value={value}
        handleChange={handleChange}
        handleBlur={handleBlur}
        errorMessage={error}
        touched={touched}
      />
    },
    label,
    value: defaultValue,
    valid: false,
    errorMessage: '',
    touched: false
  }
}

export default FormFieldConfig;