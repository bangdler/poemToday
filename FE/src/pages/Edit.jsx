import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import Header from '@/components/header/Header';
import EditForm from '@/components/writeForm/EditForm';
import { UserContext, useUser } from '@/context/UserProvider';

export default function Edit() {
  const userData = useContext(UserContext);
  const { checkUser } = useUser();
  const navigate = useNavigate();
  const { username } = useParams();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (userData.error) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [userData.error]);

  useEffect(() => {
    if (userData.user && username !== userData.user.username) {
      alert('작성자가 아닙니다. 홈으로 이동합니다.');
      navigate('/');
    }
  }, [userData.user]);

  return (
    <>
      <Header />
      <EditForm />
    </>
  );
}
