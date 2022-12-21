import React, { createContext, useReducer, useMemo, useCallback, useContext } from 'react';

import * as poemsApi from '@/api/poems';
import { LoadingDispatchContext } from '@/context/LoadingProvider';

export const PoemListContext = createContext();
export const PoemListDispatchContext = createContext();

const initialPoemListData = {
  poemList: [],
  error: null,
  lastPage: null,
  total: 0,
};

const poemListReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return initialPoemListData;
    case 'INITIALIZE_ERROR':
      return { ...state, error: null };
    case 'GET_LIST_SUCCESS':
      return { ...state, poemList: action.poemList, lastPage: action.lastPage, total: action.total };
    case 'GET_LIST_FAIL':
      return { ...state, error: action.error };
    case 'ADD_LIST_SUCCESS':
      return {
        ...state,
        poemList: [...state.poemList, ...action.poemList],
        lastPage: action.lastPage,
        total: action.total,
      };
    default:
      return state;
  }
};

export default function PoemListProvider({ children }) {
  const [poemListData, poemListDataDispatch] = useReducer(poemListReducer, initialPoemListData);

  const initializePoemList = useCallback(() => {
    poemListDataDispatch({
      type: 'INITIALIZE',
    });
  }, []);

  const initializePoemListError = useCallback(() => {
    poemListDataDispatch({
      type: 'INITIALIZE_ERROR',
    });
  }, []);

  const getListSuccess = useCallback(({ poemList, lastPage, total }) => {
    poemListDataDispatch({
      type: 'GET_LIST_SUCCESS',
      poemList,
      lastPage,
      total,
    });
  }, []);

  const getListFail = useCallback(({ error }) => {
    poemListDataDispatch({
      type: 'GET_LIST_FAIL',
      error,
    });
  }, []);

  const addListSuccess = useCallback(({ poemList, lastPage, total }) => {
    poemListDataDispatch({
      type: 'ADD_LIST_SUCCESS',
      poemList,
      lastPage,
      total,
    });
  }, []);

  const memoizedPoemListDispatches = useMemo(
    () => ({ initializePoemList, getListSuccess, getListFail, initializePoemListError, addListSuccess }),
    [initializePoemList, getListSuccess, getListFail, initializePoemListError, addListSuccess]
  );

  return (
    <PoemListContext.Provider value={poemListData}>
      <PoemListDispatchContext.Provider value={memoizedPoemListDispatches}>{children}</PoemListDispatchContext.Provider>
    </PoemListContext.Provider>
  );
}

export const usePoemList = () => {
  const { getListSuccess, getListFail, addListSuccess } = useContext(PoemListDispatchContext);
  const { startLoading, finishLoading } = useContext(LoadingDispatchContext);

  const getPoemListFromServer = useCallback(async ({ page, username, category }) => {
    startLoading({ field: 'list' });
    try {
      const response = await poemsApi.list({ page, username, category });
      getListSuccess({
        poemList: response.data,
        lastPage: parseInt(response.headers['last-page'], 10),
        total: parseInt(response.headers['result-total'], 10),
      });
    } catch (e) {
      console.log(e);
      getListFail({ error: e });
    }
    finishLoading({ field: 'list' });
  }, []);

  const searchPoemListFromServer = useCallback(async ({ text, page }) => {
    startLoading({ field: 'list' });
    try {
      const response = await poemsApi.search({ text, page });
      getListSuccess({
        poemList: response.data,
        lastPage: parseInt(response.headers['last-page'], 10),
        total: parseInt(response.headers['result-total'], 10),
      });
    } catch (e) {
      console.log(e);
      getListFail({ error: e });
    }
    finishLoading({ field: 'list' });
  }, []);

  const addPoemListFromServer = useCallback(async ({ page, username, category }) => {
    startLoading({ field: 'list' });
    try {
      const response = await poemsApi.list({ page, username, category });
      addListSuccess({
        poemList: response.data,
        lastPage: parseInt(response.headers['last-page'], 10),
        total: parseInt(response.headers['result-total'], 10),
      });
    } catch (e) {
      console.log(e);
      getListFail({ error: e });
    }
    finishLoading({ field: 'list' });
  }, []);

  return { getPoemListFromServer, searchPoemListFromServer, addPoemListFromServer };
};
