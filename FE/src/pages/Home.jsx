import React, { useContext, useEffect } from 'react';

import Header from '@/components/Header';
import PoemCardContainer from '@/components/PoemCardContainer';
import { PoemListContext, usePoemList } from '@/context/PoemListProvider';
import { UserDispatchContext, useUser } from '@/context/UserProvider';

export default function Home() {
  const { setUser } = useContext(UserDispatchContext);
  const { checkUser } = useUser();
  const { poemList, error } = useContext(PoemListContext);
  const { getPoemListFromServer } = usePoemList();

  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return;
      setUser({ user: JSON.parse(user) });
      checkUser();
    } catch (e) {
      console.log('localStorage is not working');
    }
  }, []);

  useEffect(() => {
    getPoemListFromServer();
  }, []);

  return (
    <>
      <Header />
      <p>{error ? error : ''}</p>
      <PoemCardContainer poemList={poemList} />
    </>
  );
}
