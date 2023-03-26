import { useState, useCallback } from "react";

const useForm = (formObj) => {
  const [form, setForm] = useState(formObj);

  const isInputFieldValid = useCallback(
    (inputObj) => {
      for (let rule of inputObj.validationRules) {
        if (!rule.validate(inputObj.value, form)) {
          inputObj.errorMessage = rule.message;
          return false;  
        }
      }
      return true;
    },
    [form]
  );

  const onInputChange = useCallback((event) => {
    const { name, value } = event.target;
    const inputObj = { ...form[name] };

    inputObj.value = value;

    const isValidInput = isInputFieldValid(inputObj);

    if (isValidInput && !inputObj.valid) {
      inputObj.valid = true;
    } else if (!isValidInput && inputObj.valid) {
      inputObj.valid = false;
    }

    inputObj.touched = true;
    setForm(prevForm => ({...prevForm, [name]: inputObj}));
  }, [form, isInputFieldValid]);

  const onBlurHandler = useCallback(
    (event) => {
      const { name } = event.target;
      const inputObj = { ...form[name] };
      if (inputObj.touched === true) return;

      inputObj.touched = true;
      isInputFieldValid(inputObj)

      setForm(prevForm => ({...prevForm, [name]: inputObj}));
      console.log(event.target);
    }, 
    [form, isInputFieldValid]
  );

  const renderFormFields = () => {
    const fields = Object.values(form);
    return (
      fields.map(field => {
        const { value, label, errorMessage, valid, renderField, touched } = field;
        return renderField(onInputChange, onBlurHandler, value, valid, errorMessage, label, touched);
      })
    )
  }

  const isFormValid = () => {
    let isValid = true;
    const fields = Object.values(form);

    for (let field of fields) {
      if (!field.valid) {
        isValid = false;
        break;
      }
    }
    return isValid;
  }

  return { renderFormFields, isFormValid }
}

export default useForm;