import React, { createContext, useContext, useState } from 'react';

export const ModalContext = createContext({});

const initialModal = null;
export const GO_LOGIN_ALERT = 'GO_LOGIN_ALERT';
export const REMOVE_CONFORM = 'REMOVE_CONFIRM';

export function ModalProvider({ children }) {
  const [modalState, setModalState] = useState(initialModal);
  return <ModalContext.Provider value={{ modalState, setModalState }}>{children}</ModalContext.Provider>;
}

export function useModal() {
  const { modalState, setModalState } = useContext(ModalContext);

  const initializeModal = () => {
    setModalState(initialModal);
  };

  const setRemoveConfirm = () => {
    setModalState(REMOVE_CONFORM);
  };

  const setGoLoginAlert = () => {
    setModalState(GO_LOGIN_ALERT);
  };
  return { modalState, initializeModal, setGoLoginAlert, setRemoveConfirm };
}
