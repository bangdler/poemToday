import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import { S_Button } from '@/components/common/styleButtons';
import StyleLink from '@/components/common/StyleLink';
import { AuthContext, AuthDispatchContext, useAuth } from '@/context/AuthProvider';
import palette from '@/style/palette';
import { ServerErrorNotes } from '@/utils/constants';

export default function RegisterForm() {
  const authForm = useContext(AuthContext);
  const { initializeForm, changeForm } = useContext(AuthDispatchContext);
  const { authLoading, submitAuth, checkUser } = useAuth();
  const [verifications, setVerifications] = useState({ state: true, errorMsg: '' });
  const navigate = useNavigate();

  useEffect(() => {
    initializeForm({ field: 'register' });
  }, []);

  useEffect(() => {
    if (authForm.authError) {
      console.log('오류 발생');
      console.log(authForm.authError);
      const errorStatus = authForm.authError.response.status;
      setVerifications({ state: false, errorMsg: ServerErrorNotes[errorStatus] });
      return;
    }
    if (authForm.authResponse) {
      console.log('회원가입 성공');
      console.log(authForm.authResponse);
      // 유저 체크
      checkUser();
    }
    setVerifications({ state: true, errorMsg: '' });
  }, [authForm.authResponse, authForm.authError]);

  useEffect(() => {
    if (authForm.user) {
      console.log('check API 성공');
      console.log(authForm.user);
      navigate('/');
    }
  }, [authForm.user]);

  const onChange = ({ target }) => {
    changeForm({ field: 'register', key: target.name, value: target.value });
  };

  const closeErrorBox = () => {
    setVerifications({ state: true, errorMsg: '' });
  };

  const onSubmit = e => {
    e.preventDefault();
    closeErrorBox();
    if (authForm.register.password !== authForm.register.passwordConfirm) {
      setVerifications({ state: false, errorMsg: '비밀번호가 일치하지 않습니다.' });
      return;
    }
    submitAuth({ field: 'register' });
  };

  return (
    <S_Wrapper>
      <InputBox
        title={'아이디'}
        name={'username'}
        value={authForm.register.username}
        onChange={onChange}
        autoComplete={'username'}
      />
      <InputBox
        title={'비밀번호'}
        name={'password'}
        value={authForm.register.password}
        type={'password'}
        onChange={onChange}
        autoComplete={'new-password'}
      />
      <InputBox
        title={'비밀번호 확인'}
        name={'passwordConfirm'}
        value={authForm.register.passwordConfirm}
        type={'password'}
        onChange={onChange}
        autoComplete={'new-password'}
      />
      {!verifications.state && <ErrorBox errorNote={verifications.errorMsg} onClick={closeErrorBox} />}
      <S_CyanButton size={'fullWidth'} disabled={authLoading.register} onClick={onSubmit}>
        회원가입
      </S_CyanButton>
      <S_Container>
        <StyleLink url={'/login'} content={'로그인'} />
      </S_Container>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.form`
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  font-family: 'Gamja Flower';
  padding: 1.6rem;
  > * {
    margin: 10px 0;
  }
`;

const S_CyanButton = styled(S_Button)`
  background-color: ${palette.cyan[5]};
  &:hover:enabled {
    background-color: ${palette.cyan[4]};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${palette.cyan[5]};
  }
`;

const S_Container = styled.div`
  width: 100%;
  padding-right: 1rem;
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-end' })}
`;
