import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Edit from '@/pages/Edit';
import ForgotPassword from '@/pages/ForgotPassword';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import MyPage from '@/pages/MyPage';
import PoemDetail from '@/pages/PoemDetail';
import Register from '@/pages/Register';
import Search from '@/pages/Search';
import Write from '@/pages/Write';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />}>
          <Route path=":poemId" element={<PoemDetail />} />
        </Route>
        <Route path="/@:username" element={<MyPage />}>
          <Route path=":poemId" element={<PoemDetail />} />
        </Route>
        <Route path="/search" element={<Search />}>
          <Route path=":poemId" element={<PoemDetail />} />
        </Route>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot" element={<ForgotPassword />} />
        <Route path="/write" element={<Write />} />
        <Route path="/edit/@:username/:poemId" element={<Edit />} />
      </Routes>
    </BrowserRouter>
  );
}
