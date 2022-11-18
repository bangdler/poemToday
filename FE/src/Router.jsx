import React, { useEffect, useContext } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { AuthDispatchContext, useAuth } from '@/context/AuthProvider';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import Write from '@/pages/Write';

export default function Router() {
  const { setUser } = useContext(AuthDispatchContext);
  const { checkUser } = useAuth();

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
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/write" element={<Write />} />
      </Routes>
    </BrowserRouter>
  );
}
