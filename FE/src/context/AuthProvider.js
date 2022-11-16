import React, { createContext, useReducer, useMemo, useCallback, useContext, useState, useEffect } from 'react';

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
  user: null,
  userError: null,
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
    case 'CHECK_USER_SUCCESS':
      return { ...state, user: action.response, userError: null };
    case 'CHECK_USER_FAILURE':
      return { ...state, user: null, userError: action.error };
    case 'SET_USER':
      return { ...state, user: action.user };
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

  const checkUserSuccess = useCallback(({ response }) => {
    authFormDispatch({
      type: 'CHECK_USER_SUCCESS',
      response,
    });
  }, []);

  const checkUserFail = useCallback(({ error }) => {
    authFormDispatch({
      type: 'CHECK_USER_FAILURE',
      error,
    });
  }, []);

  const setUser = useCallback(({ user }) => {
    authFormDispatch({
      type: 'SET_USER',
      user,
    });
  }, []);

  const memoizedAuthDispatches = useMemo(
    () => ({ initializeForm, changeForm, authSuccess, authFail, checkUserSuccess, checkUserFail, setUser }),
    [initializeForm, changeForm, authSuccess, authFail, checkUserSuccess, checkUserFail, setUser]
  );

  return (
    <AuthContext.Provider value={authForm}>
      <AuthDispatchContext.Provider value={memoizedAuthDispatches}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const authForm = useContext(AuthContext);
  const { authSuccess, authFail, checkUserSuccess, checkUserFail, setUser } = useContext(AuthDispatchContext);
  const [authLoading, setAuthLoading] = useState({ login: false, register: false, check: false, logout: false });

  const submitAuth = async ({ field }) => {
    const loadingStart = { ...authLoading, [field]: true };
    setAuthLoading(loadingStart);
    try {
      const response = await api[field]({ username: authForm[field].username, password: authForm[field].password });
      authSuccess({ response: response.data });
    } catch (e) {
      authFail({ error: e });
    }
    const loadingFinish = { ...authLoading, [field]: false };
    setAuthLoading(loadingFinish);
  };

  const checkUser = async () => {
    const loadingStart = { ...authLoading, check: true };
    setAuthLoading(loadingStart);
    try {
      const response = await api.check();
      checkUserSuccess({ response: response.data });
    } catch (e) {
      checkUserFail({ error: e });
      localStorage.removeItem('user');
    }
    const loadingFinish = { ...authLoading, check: false };
    setAuthLoading(loadingFinish);
  };

  const logoutUser = async () => {
    const loadingStart = { ...authLoading, logout: true };
    setAuthLoading(loadingStart);
    try {
      await api.logout();
      setUser({ user: null });
      localStorage.removeItem('user');
    } catch (e) {
      console.log(e);
    }
    const loadingFinish = { ...authLoading, logout: false };
    setAuthLoading(loadingFinish);
  };

  return { authLoading, submitAuth, checkUser, logoutUser };
};
