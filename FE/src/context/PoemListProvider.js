import React, { createContext, useReducer, useMemo, useCallback, useContext, useState } from 'react';

import * as api from '@/api/auth';

export const PoemListContext = createContext();
export const PoemListDispatchContext = createContext();

const initialPoemListData = {
  poemList: [],
  error: null,
};

const poemListReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return initialPoemListData;
    case 'GET_LIST_SUCCESS':
      return { ...state, poemList: action.response };
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

  const getListSuccess = useCallback(({ response }) => {
    poemListDataDispatch({
      type: 'GET_LIST_SUCCESS',
      response,
    });
  }, []);

  const getListFail = useCallback(({ error }) => {
    poemListDataDispatch({
      type: 'GET_LIST_FAIL',
      error,
    });
  }, []);

  const memoizedPoemListDispatches = useMemo(
    () => ({ initializePoemList, getListSuccess, getListFail }),
    [initializePoemList, getListSuccess, getListFail]
  );

  return (
    <PoemListContext.Provider value={poemListData}>
      <PoemListDispatchContext.Provider value={memoizedPoemListDispatches}>{children}</PoemListDispatchContext.Provider>
    </PoemListContext.Provider>
  );
}

export const usePoemList = () => {
  const { getListSuccess } = useContext(PoemListDispatchContext);
  const [poemListLoading, setPoemListLoading] = useState(false);

  const getPoemListFromServer = async () => {
    setPoemListLoading(true);
    try {
      const response = await api.list();
      getListSuccess({ response: response.data });
    } catch (e) {
      console.log(e);
      // get fail
    }
    setPoemListLoading(false);
  };

  return { poemListLoading, getPoemListFromServer };
};
