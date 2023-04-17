import { useReducer } from "react";

const initialState = {
  value: '',
  isTouched: false
}

const inputStateReducer = (state, action) => {
  if (action.type === 'INPUT') {
    return {
      value: action.value,
      isTouched: state.isTouched
    }
  }

  if (action.type === 'BLUR') {
    return {
      isTouched: true,
      value: state.value
    }
  }

  if (action.type === 'RESET') {
    return initialState;    
  }

  return initialState;    
};

const useInput = (validateInput) => {
  const [inputState, dispatch] = useReducer(inputStateReducer, initialState);

  const isInputValid = validateInput(inputState.value);
  const hasError = !isInputValid && inputState.isTouched;

  const valueChangeHandler = (event) => {
    dispatch({ type: 'INPUT', value: event.target.value });
  }

  const inputBlurHandler = () => {
    dispatch({ type: 'BLUR' });
  }

  const reset = () => {
    dispatch({ type: 'RESET' });
  }

  return {
    value: inputState.value,
    hasError,
    isInputValid,
    valueChangeHandler,
    inputBlurHandler,
    reset
  }
};

export default useInput;