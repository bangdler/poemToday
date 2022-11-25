import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from '@/pages/Home';
import Login from '@/pages/Login';
import PoemViewer from '@/pages/PoemViewer';
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
          <Route path=":poemId" element={<PoemViewer />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
