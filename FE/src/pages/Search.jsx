import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/header/Header';
import SearchForm from '@/components/SearchForm/SearchForm';

export default function Search() {
  return (
    <>
      <Header />
      <SearchForm />
      <Outlet />
    </>
  );
}
