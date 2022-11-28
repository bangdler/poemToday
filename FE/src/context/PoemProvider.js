import React, { createContext, useReducer, useMemo, useCallback, useContext, useState } from 'react';

import * as poemsApi from '@/api/poems';
import { Categories } from '@/utils/constants';

export const PoemContext = createContext();
export const PoemDispatchContext = createContext();

const initialForm = {
  title: '',
  body: '',
  author: '',
  category: Categories,
  response: null,
  error: null,
};

const initialPoemData = {
  write: initialForm,
  edit: initialForm,
};

const poemReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, [action.field]: initialForm };
    case 'CHANGE':
      return { ...state, write: { ...state[action.field], [action.key]: action.value } };
    case 'POST_POEM_SUCCESS':
      return { ...state, write: { ...state[action.field], response: action.response, error: null } };
    case 'POST_POEM_FAIL':
      return { ...state, write: { ...state[action.field], response: null, error: action.error } };
    default:
      return state;
  }
};

export default function PoemProvider({ children }) {
  const [poemData, poemDataDispatch] = useReducer(poemReducer, initialPoemData);

  const initializePoem = useCallback(({ field }) => {
    poemDataDispatch({
      type: 'INITIALIZE',
      field,
    });
  }, []);

  const initializeError = useCallback(({ field }) => {
    poemDataDispatch({
      type: 'CHANGE',
      field,
      key: 'error',
      value: null,
    });
  }, []);

  const changePoemData = useCallback(({ field, key, value }) => {
    poemDataDispatch({
      type: 'CHANGE',
      field,
      key,
      value,
    });
  }, []);

  const postPoemSuccess = useCallback(({ field, response }) => {
    poemDataDispatch({
      type: 'POST_POEM_SUCCESS',
      field,
      response,
    });
  }, []);

  const postPoemFail = useCallback(({ field, error }) => {
    poemDataDispatch({
      type: 'POST_POEM_FAIL',
      field,
      error,
    });
  }, []);
  const memoizedPoemDispatches = useMemo(
    () => ({ initializePoem, initializeError, postPoemSuccess, postPoemFail, changePoemData }),
    [initializePoem, initializeError, postPoemSuccess, postPoemFail, changePoemData]
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

  const [poemLoading, setPoemLoading] = useState({ write: false });

  const writePoemToServer = async () => {
    const loadingStart = { ...poemLoading, write: true };
    setPoemLoading(loadingStart);
    try {
      const response = await poemsApi.write({
        title: poemData.write.title,
        author: poemData.write.author,
        body: poemData.write.body,
        category: poemData.write.category,
      });
      postPoemSuccess({ field: 'write', response: response.data });
    } catch (e) {
      console.log(e);
      postPoemFail({ field: 'write', error: e });
    }
    const loadingFinish = { ...poemLoading, write: false };
    setPoemLoading(loadingFinish);
  };

  return { poemLoading, writePoemToServer };
};
