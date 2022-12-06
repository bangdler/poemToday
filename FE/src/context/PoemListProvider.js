import React, { createContext, useReducer, useMemo, useCallback, useContext, useState } from 'react';

import * as poemsApi from '@/api/poems';

export const PoemListContext = createContext();
export const PoemListDispatchContext = createContext();

const initialPoemListData = {
  poemList: [],
  error: null,
  lastPage: 1,
};

const poemListReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return initialPoemListData;
    case 'INITIALIZE_ERROR':
      return { ...state, error: null };
    case 'GET_LIST_SUCCESS':
      return { ...state, poemList: action.poemList, lastPage: action.lastPage };
    case 'GET_LIST_FAIL':
      return { ...state, error: action.error };
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

  const getListSuccess = useCallback(({ poemList, lastPage }) => {
    poemListDataDispatch({
      type: 'GET_LIST_SUCCESS',
      poemList,
      lastPage,
    });
  }, []);

  const getListFail = useCallback(({ error }) => {
    poemListDataDispatch({
      type: 'GET_LIST_FAIL',
      error,
    });
  }, []);

  const memoizedPoemListDispatches = useMemo(
    () => ({ initializePoemList, getListSuccess, getListFail, initializePoemListError }),
    [initializePoemList, getListSuccess, getListFail, initializePoemListError]
  );

  return (
    <PoemListContext.Provider value={poemListData}>
      <PoemListDispatchContext.Provider value={memoizedPoemListDispatches}>{children}</PoemListDispatchContext.Provider>
    </PoemListContext.Provider>
  );
}

export const usePoemList = () => {
  const { getListSuccess, getListFail } = useContext(PoemListDispatchContext);
  const [poemListLoading, setPoemListLoading] = useState(false);

  const getPoemListFromServer = async ({ page, username, category }) => {
    setPoemListLoading(true);
    try {
      const response = await poemsApi.list({ page, username, category });
      getListSuccess({ poemList: response.data, lastPage: parseInt(response.headers['last-page'], 10) });
    } catch (e) {
      console.log(e);
      getListFail({ error: e });
    }
    setPoemListLoading(false);
  };

  return { poemListLoading, getPoemListFromServer };
};
