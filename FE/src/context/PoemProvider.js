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
  read: { response: null, error: null },
  remove: { response: null, error: null },
};

const poemReducer = (state, action) => {
  switch (action.type) {
    case 'INITIALIZE':
      return { ...state, [action.field]: initialPoemData[action.field] };
    case 'SET':
      return { ...state, [action.field]: action.state };
    case 'CHANGE':
      return { ...state, [action.field]: { ...state[action.field], [action.key]: action.value } };
    case 'POEMS_API_SUCCESS':
      return { ...state, [action.field]: { ...state[action.field], response: action.response, error: null } };
    case 'POEMS_API_FAIL':
      return { ...state, [action.field]: { ...state[action.field], response: null, error: action.error } };
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

  const poemsApiSuccess = useCallback(({ field, response }) => {
    poemDataDispatch({
      type: 'POEMS_API_SUCCESS',
      field,
      response,
    });
  }, []);

  const poemsApiFail = useCallback(({ field, error }) => {
    poemDataDispatch({
      type: 'POEMS_API_FAIL',
      field,
      error,
    });
  }, []);

  const setPoemData = useCallback(({ field, state }) => {
    poemDataDispatch({
      type: 'SET',
      field,
      state,
    });
  }, []);

  const memoizedPoemDispatches = useMemo(
    () => ({ initializePoem, initializeError, poemsApiSuccess, poemsApiFail, changePoemData, setPoemData }),
    [initializePoem, initializeError, poemsApiSuccess, poemsApiFail, changePoemData, setPoemData]
  );

  return (
    <PoemContext.Provider value={poemData}>
      <PoemDispatchContext.Provider value={memoizedPoemDispatches}>{children}</PoemDispatchContext.Provider>
    </PoemContext.Provider>
  );
}

export const usePoem = () => {
  const poemData = useContext(PoemContext);
  const { poemsApiSuccess, poemsApiFail } = useContext(PoemDispatchContext);

  const [poemLoading, setPoemLoading] = useState({ write: false, read: false, remove: false });

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
      poemsApiSuccess({ field: 'write', response: response.data });
    } catch (e) {
      console.log(e);
      poemsApiFail({ field: 'write', error: e });
    }
    const loadingFinish = { ...poemLoading, write: false };
    setPoemLoading(loadingFinish);
  };

  const getPoemByIdFromServer = async ({ id }) => {
    const loadingStart = { ...poemLoading, read: true };
    setPoemLoading(loadingStart);
    try {
      const response = await poemsApi.read({ id });
      poemsApiSuccess({ field: 'read', response: response.data });
    } catch (e) {
      console.log(e);
      poemsApiFail({ field: 'read', error: e });
    }
    const loadingFinish = { ...poemLoading, read: false };
    setPoemLoading(loadingFinish);
  };

  const removePoemByIdFromServer = async ({ id }) => {
    const loadingStart = { ...poemLoading, remove: true };
    setPoemLoading(loadingStart);
    try {
      const response = await poemsApi.remove({ id });
      poemsApiSuccess({ field: 'remove', response: response.data });
    } catch (e) {
      console.log(e);
      poemsApiFail({ field: 'remove', error: e });
    }
    const loadingFinish = { ...poemLoading, remove: false };
    setPoemLoading(loadingFinish);
  };

  return { poemLoading, writePoemToServer, getPoemByIdFromServer, removePoemByIdFromServer };
};
