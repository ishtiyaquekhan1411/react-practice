const createValidationRule = (ruleName, errorMessage, validator) => {
  return {
    name: ruleName,
    message: errorMessage,
    validate: validator     
  }
}

export const requiredRule = (inputName) => {
  return createValidationRule(
    'required',
    `${inputName} required`,
    (inputValue, formObj = {}) => inputValue.length !== 0
  )
}

export const minLengthRule = (inputName, minCharacters) => {
  return createValidationRule(
    'minLength',
    `${inputName} should contain atleast ${minCharacters} characters`,
    (inputValue, formObj = {}) => inputValue.length >= minCharacters
  )
}

export const maxLengthRule = (inputName, maxCharacters) => {
  return createValidationRule(
    'maxLength',
    `${inputName} cannot contain more than ${maxCharacters} characters`,
    (inputValue, formObj = {}) => inputValue.length <= maxCharacters
  )
}

export const passwordMatchRule = () => {
  return createValidationRule(
    'passwordMatch',
    `Password do not match`,
    (inputValue, formObj = {}) => inputValue === formObj.password.value
  );
}

export const emailFormatRule = () => {
  return createValidationRule(
    'emailFormat',
    'Invalid Email Format',
    (inputValue, formObj = {}) => inputValue.includes('@')
  )
}