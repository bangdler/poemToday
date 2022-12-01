import React, { useContext, useEffect } from 'react';

import Header from '@/components/header/Header';
import PoemCardContainer from '@/components/poemCardContainer/PoemCardContainer';
import { UserDispatchContext, useUser } from '@/context/UserProvider';

export default function Home() {
  const { setUser } = useContext(UserDispatchContext);
  const { checkUser } = useUser();

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

  return (
    <>
      <Header />
      <PoemCardContainer />
    </>
  );
}
