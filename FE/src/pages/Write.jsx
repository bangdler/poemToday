import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '@/components/Header';
import WriteForm from '@/components/WriteForm';
import { UserContext, useUser } from '@/context/UserProvider';

export default function Write() {
  const userData = useContext(UserContext);
  const { checkUser } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (userData.error) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [userData.error]);

  return (
    <>
      <Header />
      <WriteForm />
    </>
  );
}
