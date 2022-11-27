import React, { createContext, useReducer, useMemo, useCallback, useContext, useState } from 'react';

import * as poemsApi from '@/api/poems';
import { Categories } from '@/utils/constants';

export const PoemContext = createContext();
export const PoemDispatchContext = createContext();

const initialPoemData = {
  title: '',
  body: '',
  author: '',
  category: Categories,
  response: null,
  error: null,
};

const poemReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return initialPoemData;
    case 'CHANGE':
      return { ...state, [action.key]: action.value };
    case 'POST_POEM_SUCCESS':
      return { ...state, response: action.response, error: null };
    case 'POST_POEM_FAIL':
      return { ...state, response: null, error: action.error };
    default:
      return state;
  }
};

export default function PoemProvider({ children }) {
  const [poemData, poemDataDispatch] = useReducer(poemReducer, initialPoemData);

  const initializePoem = useCallback(() => {
    poemDataDispatch({
      type: 'INITIALIZE',
    });
  }, []);

  const changePoemData = useCallback(({ key, value }) => {
    poemDataDispatch({
      type: 'CHANGE',
      key,
      value,
    });
  }, []);

  const postPoemSuccess = useCallback(({ response }) => {
    poemDataDispatch({
      type: 'POST_POEM_SUCCESS',
      response,
    });
  }, []);

  const postPoemFail = useCallback(({ error }) => {
    poemDataDispatch({
      type: 'POST_POEM_FAIL',
      error,
    });
  }, []);
  const memoizedPoemDispatches = useMemo(
    () => ({ initializePoem, postPoemSuccess, postPoemFail, changePoemData }),
    [initializePoem, postPoemSuccess, postPoemFail, changePoemData]
  );

  return (
    <PoemContext.Provider value={poemData}>
      <PoemDispatchContext.Provider value={memoizedPoemDispatches}>{children}</PoemDispatchContext.Provider>
    </PoemContext.Provider>
  );
}

export const usePoem = () => {
  const poemData = useContext(PoemContext);
  const { postPoemSuccess, postPoemFail } = useContext(PoemDispatchContext);

  const [poemLoading, setPoemLoading] = useState(false);

  const postPoemToServer = async () => {
    setPoemLoading(true);
    try {
      const response = await poemsApi.write({
        title: poemData.title,
        author: poemData.author,
        body: poemData.body,
        category: poemData.category,
      });
      postPoemSuccess({ response: response.data });
    } catch (e) {
      console.log(e);
      postPoemFail({ error: e });
    }
    setPoemLoading(false);
  };

  return { poemLoading, postPoemToServer };
};
