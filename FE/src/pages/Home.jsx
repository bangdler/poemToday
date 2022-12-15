import React, { useContext, useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/header/Header';
import PoemScroll from '@/components/poemCards/PoemScroll';
import { UserDispatchContext, useUser } from '@/context/UserProvider';
import { getLocalStorage } from '@/utils/util';

export default function Home() {
  const { setUser } = useContext(UserDispatchContext);
  const { checkUser } = useUser();

  useEffect(() => {
    const user = getLocalStorage('user');
    if (!user) {
      checkUser();
      return;
    }
    setUser({ user: JSON.parse(user) });
    checkUser();
  }, []);

  return (
    <>
      <Header />
      <PoemScroll />
      <Outlet />
    </>
  );
}
