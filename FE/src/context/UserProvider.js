import React, { createContext, useReducer, useMemo, useCallback, useContext, useState } from 'react';

import * as api from '@/api/auth.js';

export const UserContext = createContext();
export const UserDispatchContext = createContext();

const initialUserData = {
  user: null,
  error: null,
};

const userReducer = (state, action) => {
  switch (action.type) {
    case 'CHECK_USER_SUCCESS':
      return { user: action.response, error: null };
    case 'CHECK_USER_FAILURE':
      return { user: null, error: action.error };
    case 'SET_USER':
      return { ...state, user: action.user };
    default:
      return state;
  }
};

export default function UserProvider({ children }) {
  const [userData, userDataDispatch] = useReducer(userReducer, initialUserData);

  const checkUserSuccess = useCallback(({ response }) => {
    userDataDispatch({
      type: 'CHECK_USER_SUCCESS',
      response,
    });
  }, []);

  const checkUserFail = useCallback(({ error }) => {
    userDataDispatch({
      type: 'CHECK_USER_FAILURE',
      error,
    });
  }, []);

  const setUser = useCallback(({ user }) => {
    userDataDispatch({
      type: 'SET_USER',
      user,
    });
  }, []);

  const memoizedUserDispatches = useMemo(
    () => ({ checkUserSuccess, checkUserFail, setUser }),
    [checkUserSuccess, checkUserFail, setUser]
  );

  return (
    <UserContext.Provider value={userData}>
      <UserDispatchContext.Provider value={memoizedUserDispatches}>{children}</UserDispatchContext.Provider>
    </UserContext.Provider>
  );
}

export const useUser = () => {
  const { checkUserSuccess, checkUserFail, setUser } = useContext(UserDispatchContext);
  const [userLoading, setUserLoading] = useState({ check: false, logout: false });

  const checkUser = async () => {
    const loadingStart = { ...userLoading, check: true };
    setUserLoading(loadingStart);
    try {
      const response = await api.check();
      checkUserSuccess({ response: response.data });
    } catch (e) {
      checkUserFail({ error: e });
      localStorage.removeItem('user');
    }
    const loadingFinish = { ...userLoading, check: false };
    setUserLoading(loadingFinish);
  };

  const logoutUser = async () => {
    const loadingStart = { ...userLoading, logout: true };
    setUserLoading(loadingStart);
    try {
      await api.logout();
      setUser({ user: null });
      localStorage.removeItem('user');
    } catch (e) {
      setUser({ user: null });
      localStorage.removeItem('user');
      console.log(e);
    }
    const loadingFinish = { ...userLoading, logout: false };
    setUserLoading(loadingFinish);
  };

  return { userLoading, checkUser, logoutUser };
};
