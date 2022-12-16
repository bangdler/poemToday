import React, { createContext, useReducer, useMemo, useCallback, useContext } from 'react';

import * as authApi from '@/api/auth.js';
import { LoadingDispatchContext } from '@/context/LoadingProvider';

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

const authReducer = (state, action) => {
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
  const [authForm, authFormDispatch] = useReducer(authReducer, initialAuthForm);

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

export const useAuth = () => {
  const authForm = useContext(AuthContext);
  const { startLoading, finishLoading } = useContext(LoadingDispatchContext);
  const { authSuccess, authFail } = useContext(AuthDispatchContext);

  const submitAuth = useCallback(async ({ field }) => {
    startLoading({ field });
    try {
      const response = await authApi[field]({ username: authForm[field].username, password: authForm[field].password });
      authSuccess({ response: response.data });
    } catch (e) {
      authFail({ error: e });
    }
    finishLoading({ field });
  }, []);

  return { submitAuth };
};
