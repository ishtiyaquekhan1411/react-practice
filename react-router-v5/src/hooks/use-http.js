import { useReducer, useCallback } from 'react';

function httpReducer(state, action) {
  if (action.type === 'SEND') {
    return {
      data: null,
      error: null,
      status: 'pending',
    };
  }

  if (action.type === 'SUCCESS') {
    return {
      data: action.responseData,
      error: null,
      status: 'completed',
    };
  }

  if (action.type === 'ERROR') {
    return {
      data: null,
      error: action.errorMessage,
      status: 'completed',
    };
  }

  return state;
}

function useHttp(requestFunction, startWithPending = false) {
  const [httpState, dispatch] = useReducer(httpReducer, {
    // Accepts reducer function and initial state value, it is advanced version of useState to support conditional state updation.
    status: startWithPending ? 'pending' : null,
    data: null,
    error: null,
  });

  const sendRequest = useCallback(
    // useCallback is a react hook that returns a memorized callback when passed a function and a list of dependencies that set the parameters.
    // It’s useful when a component is passing a callback to its child component in order to prevent rendering.
    // It only changes the callback when one of its dependencies is changed.
    // useMemo is very similar to useCallback only difference is that useMemo returns the memo-ized value returned by the passed function.
    // useMemo only recalculates the value when one of the dependencies changes. It can be use in case where function does heavy calculations.

    async function (requestData) {
      dispatch({ type: 'SEND' });
      try {
        const responseData = await requestFunction(requestData);
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: error.message || 'Something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
}

export default useHttp;
