import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import PoemDetail from '@/pages/PoemDetail';
import Register from '@/pages/Register';
import Write from '@/pages/Write';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<Write />} />
        <Route path="/@:username">
          <Route path=":poemId" element={<PoemDetail />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
