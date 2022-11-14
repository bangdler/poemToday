import React, { createContext, useReducer, useMemo, useCallback } from 'react';

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

const InitialAuthForm = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, [action.field]: InitialAuthForm[action.field] };
    case 'CHANGE':
      return { ...state, [action.field]: { ...state[action.field], [action.key]: action.value } };
    default:
      return state;
  }
};

export default function AuthProvider({ children }) {
  const [authForm, dispatch] = useReducer(reducer, InitialAuthForm);

  const initializeForm = useCallback(({ field }) => {
    dispatch({
      type: 'INITIALIZE',
      field,
    });
  }, []);

  const changeForm = useCallback(({ field, key, value }) => {
    dispatch({
      type: 'CHANGE',
      field,
      key,
      value,
    });
  }, []);

  const memoizedAuthDispatches = useMemo(() => ({ initializeForm, changeForm }), [initializeForm, changeForm]);

  return (
    <AuthContext.Provider value={authForm}>
      <AuthDispatchContext.Provider value={memoizedAuthDispatches}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}
