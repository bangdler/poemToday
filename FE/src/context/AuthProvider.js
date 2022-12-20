import React, { createContext, useReducer, useMemo, useCallback, useContext } from 'react';

import * as authApi from '@/api/auth.js';
import { LoadingDispatchContext } from '@/context/LoadingProvider';

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

const initialAuth = {
  response: null,
  error: null,
  verifyResponse: null,
  verifyError: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return initialAuth;
    case 'AUTH_SUCCESS':
      return { error: null, response: action.response };
    case 'AUTH_FAILURE':
      return { ...state, error: action.error };
    case 'VERIFY_SUCCESS':
      return { error: null, verifyResponse: action.response };
    case 'VERIFY_FAILURE':
      return { ...state, verifyError: action.error };
    default:
      return state;
  }
};

export default function AuthProvider({ children }) {
  const [auth, authDispatch] = useReducer(authReducer, initialAuth);

  const initializeAuth = useCallback(() => {
    authDispatch({
      type: 'INITIALIZE',
    });
  }, []);

  const authSuccess = useCallback(({ response }) => {
    authDispatch({
      type: 'AUTH_SUCCESS',
      response,
    });
  }, []);

  const authFail = useCallback(({ error }) => {
    authDispatch({
      type: 'AUTH_FAILURE',
      error,
    });
  }, []);

  const verifySuccess = useCallback(({ response }) => {
    authDispatch({
      type: 'VERIFY_SUCCESS',
      response,
    });
  }, []);

  const verifyFail = useCallback(({ error }) => {
    authDispatch({
      type: 'VERIFY_FAILURE',
      error,
    });
  }, []);
  const memoizedAuthDispatches = useMemo(
    () => ({ initializeAuth, authSuccess, authFail, verifySuccess, verifyFail }),
    [initializeAuth, authSuccess, authFail, verifySuccess, verifyFail]
  );

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={memoizedAuthDispatches}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { startLoading, finishLoading } = useContext(LoadingDispatchContext);
  const { authSuccess, authFail, verifySuccess, verifyFail } = useContext(AuthDispatchContext);

  // login, register 모두 사용 가능
  const submitAuth = useCallback(async ({ field, username, password }) => {
    startLoading({ field });
    try {
      const response = await authApi[field]({
        username,
        password,
      });
      authSuccess({ response: response.data });
    } catch (e) {
      authFail({ error: e });
    }
    finishLoading({ field });
  }, []);

  const resignAuth = useCallback(async () => {
    startLoading({ field: 'resign' });
    try {
      const response = await authApi.resign();
      authSuccess({ response: response.data });
    } catch (e) {
      authFail({ error: e });
    }
    finishLoading({ field: 'resign' });
  });

  const changePassword = useCallback(async ({ existPassword, newPassword }) => {
    startLoading({ field: 'changePassword' });
    try {
      const response = await authApi.changePassword({ existPassword, newPassword });
      authSuccess({ response: response.data });
    } catch (e) {
      authFail({ error: e });
    }
    finishLoading({ field: 'changePassword' });
  });

  const verifyEmail = useCallback(async ({ email }) => {
    startLoading({ field: 'verifyEmail' });
    try {
      const response = await authApi.verifyEmail({ email });
      verifySuccess({ response: response.data });
    } catch (e) {
      verifyFail({ error: e });
    }
    finishLoading({ field: 'verifyEmail' });
  });
  return { submitAuth, resignAuth, changePassword, verifyEmail };
};
