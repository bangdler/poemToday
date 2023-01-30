import React, { createContext, useReducer, useMemo, useCallback, useContext, useEffect } from 'react';

import * as poemsApi from '@/api/poems';
import { LoadingDispatchContext } from '@/context/LoadingProvider';

export const PoemListContext = createContext();
export const PoemListDispatchContext = createContext();

const calculateNumOfList = () => {
  const $bodyWidth = document.body.offsetWidth;
  const $appWidth = $bodyWidth > 1024 ? Math.min(1824, $bodyWidth * 0.9) : Math.max(768, $bodyWidth * 0.8);
  const poemWidth = 240;
  const margin = 0.9;
  const numOfList = Math.floor(($appWidth * margin) / poemWidth) * 2;
  return numOfList;
};

const initialPoemListData = {
  poemList: [],
  error: null,
  lastPage: null,
  total: 0,
  numOfList: calculateNumOfList(),
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
    case 'REMOVE_POEM':
      return {
        ...state,
        poemList: state.poemList.filter(poem => poem._id !== action.id),
        lastPage: Math.ceil((state.total - 1) / state.numOfList),
        total: state.total - 1,
      };
    case 'UPDATE_POEM':
      return {
        ...state,
        poemList: state.poemList.map(poem => {
          if (poem._id === action.id) {
            return action.poem;
          } else {
            return poem;
          }
        }),
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

  const removePoemFromList = useCallback(({ id }) => {
    poemListDataDispatch({
      type: 'REMOVE_POEM',
      id,
    });
  }, []);

  const updatePoemFromList = useCallback(({ id, poem }) => {
    poemListDataDispatch({
      type: 'UPDATE_POEM',
      id,
      poem,
    });
  }, []);

  const memoizedPoemListDispatches = useMemo(
    () => ({
      initializePoemList,
      getListSuccess,
      getListFail,
      initializePoemListError,
      addListSuccess,
      removePoemFromList,
      updatePoemFromList,
    }),
    [
      initializePoemList,
      getListSuccess,
      getListFail,
      initializePoemListError,
      addListSuccess,
      removePoemFromList,
      updatePoemFromList,
    ]
  );

  return (
    <PoemListContext.Provider value={poemListData}>
      <PoemListDispatchContext.Provider value={memoizedPoemListDispatches}>{children}</PoemListDispatchContext.Provider>
    </PoemListContext.Provider>
  );
}

export const usePoemList = () => {
  const { numOfList } = useContext(PoemListContext);
  const { getListSuccess, getListFail, addListSuccess } = useContext(PoemListDispatchContext);
  const { startLoading, finishLoading } = useContext(LoadingDispatchContext);

  const getPoemListFromServer = useCallback(async ({ page, username, category, number = numOfList }) => {
    startLoading({ field: 'list' });
    try {
      const response = await poemsApi.list({ page, username, category, number });
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

  const searchPoemListFromServer = useCallback(async ({ text, page, number = numOfList }) => {
    startLoading({ field: 'list' });
    try {
      const response = await poemsApi.search({ text, page, number });
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

  const addPoemListFromServer = useCallback(
    async ({ page, username, category, number = numOfList, startPublishedDate }) => {
      startLoading({ field: 'list' });
      try {
        const response = await poemsApi.list({ page, username, category, number, startPublishedDate });
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
    },
    []
  );

  return { getPoemListFromServer, searchPoemListFromServer, addPoemListFromServer };
};
