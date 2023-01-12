import React, { createContext, useReducer, useMemo, useCallback, useContext } from 'react';

import * as poemsApi from '@/api/poems';
import { LoadingDispatchContext } from '@/context/LoadingProvider';

export const PoemContext = createContext();
export const PoemDispatchContext = createContext();

const initialForm = {
  title: '',
  body: '',
  author: '',
  category: [],
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
  const { poemsApiSuccess, poemsApiFail } = useContext(PoemDispatchContext);
  const { startLoading, finishLoading } = useContext(LoadingDispatchContext);

  const writePoemToServer = useCallback(async ({ title, author, body, category }) => {
    startLoading({ field: 'write' });
    try {
      const response = await poemsApi.write({
        title,
        author,
        body,
        category,
      });
      poemsApiSuccess({ field: 'write', response: response.data });
    } catch (e) {
      console.log(e);
      poemsApiFail({ field: 'write', error: e });
    }
    finishLoading({ field: 'write' });
  }, []);

  const getPoemByIdFromServer = useCallback(async ({ id }) => {
    startLoading({ field: 'read' });
    try {
      const response = await poemsApi.read({ id });
      poemsApiSuccess({ field: 'read', response: response.data });
    } catch (e) {
      console.log(e);
      poemsApiFail({ field: 'read', error: e });
    }
    finishLoading({ field: 'read' });
  }, []);

  const removePoemByIdFromServer = useCallback(async ({ id }) => {
    startLoading({ field: 'remove' });
    try {
      const response = await poemsApi.remove({ id });
      poemsApiSuccess({ field: 'remove', response: response.data });
    } catch (e) {
      console.log(e);
      poemsApiFail({ field: 'remove', error: e });
    }
    finishLoading({ field: 'remove' });
  }, []);

  const updatePoemByIdToServer = useCallback(async ({ id, title, author, body, category }) => {
    startLoading({ field: 'edit' });
    try {
      const response = await poemsApi.update({
        id,
        title,
        author,
        body,
        category,
      });
      poemsApiSuccess({ field: 'edit', response: response.data });
    } catch (e) {
      console.log(e);
      poemsApiFail({ field: 'edit', error: e });
    }
    finishLoading({ field: 'edit' });
  }, []);

  return { writePoemToServer, getPoemByIdFromServer, removePoemByIdFromServer, updatePoemByIdToServer };
};
