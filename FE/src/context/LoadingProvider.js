import React, { createContext, useCallback, useMemo, useReducer } from 'react';

export const LoadingContext = createContext();
export const LoadingDispatchContext = createContext();

const initialLoading = {
  register: false,
  login: false,
  check: false,
  logout: false,
  write: false,
  read: false,
  remove: false,
  edit: false,
  list: false,
};

const loadingReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return initialLoading;
    case 'LOADING_START':
      return { ...state, [action.field]: true };
    case 'LOADING_FINISH':
      return { ...state, [action.field]: false };
    default:
      return state;
  }
};

export default function LoadingProvider({ children }) {
  const [loading, loadingDispatch] = useReducer(loadingReducer, initialLoading);

  const initializeLoading = useCallback(() => {
    loadingDispatch({
      type: 'INITIALIZE',
    });
  }, []);

  const startLoading = useCallback(({ field }) => {
    loadingDispatch({
      type: 'LOADING_START',
      field,
    });
  }, []);

  const finishLoading = useCallback(({ field }) => {
    loadingDispatch({
      type: 'LOADING_FINISH',
      field,
    });
  }, []);

  const memoizedLoadingDispatches = useMemo(
    () => ({ initialLoading, startLoading, finishLoading }),
    [initializeLoading, startLoading, finishLoading]
  );

  return (
    <LoadingContext.Provider value={loading}>
      <LoadingDispatchContext.Provider value={memoizedLoadingDispatches}>{children}</LoadingDispatchContext.Provider>
    </LoadingContext.Provider>
  );
}
