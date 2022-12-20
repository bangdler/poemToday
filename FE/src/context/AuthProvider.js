import React, { createContext, useReducer, useMemo, useCallback, useContext } from 'react';

import * as authApi from '@/api/auth.js';
import { LoadingDispatchContext } from '@/context/LoadingProvider';

export const AuthContext = createContext();
export const AuthDispatchContext = createContext();

const initialAuth = {
  response: null,
  error: null,
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return initialAuth;
    case 'AUTH_SUCCESS':
      return { error: null, response: action.response };
    case 'AUTH_FAILURE':
      return { ...state, error: action.error };
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

  const memoizedAuthDispatches = useMemo(
    () => ({ initializeAuth, authSuccess, authFail }),
    [initializeAuth, authSuccess, authFail]
  );

  return (
    <AuthContext.Provider value={auth}>
      <AuthDispatchContext.Provider value={memoizedAuthDispatches}>{children}</AuthDispatchContext.Provider>
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const { startLoading, finishLoading } = useContext(LoadingDispatchContext);
  const { authSuccess, authFail } = useContext(AuthDispatchContext);

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

  return { submitAuth, resignAuth };
};
