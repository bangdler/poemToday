import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '@/components/header/Header';
import SearchCardContainer from '@/components/SearchForm/SearchCardContainer';
import SearchForm from '@/components/SearchForm/SearchForm';

export default function Search() {
  return (
    <>
      <Header />
      <SearchForm />
      <SearchCardContainer />
      <Outlet />
    </>
  );
}
