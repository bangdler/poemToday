import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/header/Header';
import SearchForm from '@/components/SearchForm/SearchForm';
import { useUser } from '@/context/UserProvider';

export default function Search() {
  const { checkUser } = useUser();

  useEffect(() => {
    checkUser();
  }, []);

  return (
    <>
      <Header />
      <SearchForm />
      <Outlet />
    </>
  );
}
