import React, { createContext, useReducer, useMemo, useCallback, useContext, useState } from 'react';

import * as api from '@/api/auth.js';

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

const initialAuthForm = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
  },
  login: {
    username: '',
    password: '',
  },
  authResponse: null,
  authError: null,
};

const authFormReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, [action.field]: initialAuthForm[action.field], authError: null, authResponse: null };
    case 'CHANGE':
      return { ...state, [action.field]: { ...state[action.field], [action.key]: action.value } };
    case 'AUTH_SUCCESS':
      return { ...state, authError: null, authResponse: action.response };
    case 'AUTH_FAILURE':
      return { ...state, authError: action.error };
    default:
      return state;
  }
};

export default function AuthProvider({ children }) {
  const [authForm, authFormDispatch] = useReducer(authFormReducer, initialAuthForm);

  const initializeForm = useCallback(({ field }) => {
    authFormDispatch({
      type: 'INITIALIZE',
      field,
    });
  }, []);

  const changeForm = useCallback(({ field, key, value }) => {
    authFormDispatch({
      type: 'CHANGE',
      field,
      key,
      value,
    });
  }, []);

  const authSuccess = useCallback(({ response }) => {
    authFormDispatch({
      type: 'AUTH_SUCCESS',
      response,
    });
  }, []);

  const authFail = useCallback(({ error }) => {
    authFormDispatch({
      type: 'AUTH_FAILURE',
      error,
    });
  }, []);

  const memoizedAuthDispatches = useMemo(
    () => ({ initializeForm, changeForm, authSuccess, authFail }),
    [initializeForm, changeForm, authSuccess, authFail]
  );

  return (
    <AuthContext.Provider value={authForm}>
      <AuthDispatchContext.Provider value={memoizedAuthDispatches}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const useSubmitAuth = () => {
  const authForm = useContext(AuthContext);
  const { authSuccess, authFail } = useContext(AuthDispatchContext);
  const [authLoading, setAuthLoading] = useState({ login: false, register: false });

  const submitAuth = async ({ type }) => {
    const loadingStart = { ...authLoading, [type]: true };
    setAuthLoading(loadingStart);

    try {
      const response = await api[type]({ username: authForm[type].username, password: authForm[type].password });
      authSuccess({ response: response.data });
    } catch (e) {
      authFail({ error: e });
    }
    const loadingFinish = { ...authLoading, [type]: false };
    setAuthLoading(loadingFinish);
  };

  return [authLoading, submitAuth];
};