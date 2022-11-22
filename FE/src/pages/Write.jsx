import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import Editor from '@/components/Editor';
import Header from '@/components/Header';
import WriteActionButtons from '@/components/WriteActionButtons';
import { AuthContext, useAuth } from '@/context/AuthProvider';

export default function Write() {
  const authForm = useContext(AuthContext);
  const { checkUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    checkUser();
  }, []);

  useEffect(() => {
    if (authForm.userError) {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
  }, [authForm.userError]);

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
`;
