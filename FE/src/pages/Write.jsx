import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Editor from '@/components/Editor';
import Header from '@/components/Header';
import WriteActionButtons from '@/components/WriteActionButtons';
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
      <S_FormLayout>
        <Editor />
        <WriteActionButtons />
      </S_FormLayout>
    </>
  );
}

const S_FormLayout = styled.form`
  padding: 1rem;
  max-width: 768px;
`;
