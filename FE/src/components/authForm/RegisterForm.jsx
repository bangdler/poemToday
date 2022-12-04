import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StyleLink from '@/components/common/StyleLink';
import { S_CyanButton } from '@/components/commonStyled/styleButtons';
import { AuthContext, AuthDispatchContext, useAuth } from '@/context/AuthProvider';
import { UserContext, useUser } from '@/context/UserProvider';
import { LoginServerErrorMessages } from '@/utils/constants';

export default function RegisterForm() {
  const authForm = useContext(AuthContext);
  const { initializeForm, changeForm } = useContext(AuthDispatchContext);
  const { authLoading, submitAuth } = useAuth();
  const userData = useContext(UserContext);
  const { checkUser } = useUser();
  const [error, setError] = useState({ state: false, message: '' });
  const navigate = useNavigate();

  useEffect(() => {
    initializeForm({ field: 'register' });
    return () => initializeForm({ field: 'register' });
  }, []);

  useEffect(() => {
    if (authForm.authError) {
      console.log('오류 발생');
      console.log(authForm.authError);
      const errorStatus = authForm.authError.response.status;
      setError({ state: true, message: LoginServerErrorMessages[errorStatus] });
      return;
    }
    if (authForm.authResponse) {
      console.log('회원가입 성공');
      console.log(authForm.authResponse);
      // 유저 체크
      checkUser();
    }
    setError({ state: false, message: '' });
  }, [authForm.authResponse, authForm.authError]);

  useEffect(() => {
    if (userData.user) {
      console.log('check API 성공');
      console.log(userData.user);
      navigate('/');
    }
  }, [userData.user]);

  const onChange = ({ target }) => {
    changeForm({ field: 'register', key: target.name, value: target.value });
  };

  const closeErrorBox = async () => {
    setError({ state: false, message: '' });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await closeErrorBox();
    if ([authForm.register.username, authForm.register.password, authForm.register.passwordConfirm].includes('')) {
      setError({ state: true, message: '빈 칸을 모두 입력하세요.' });
      return;
    }
    if (authForm.register.password !== authForm.register.passwordConfirm) {
      setError({ state: true, message: '비밀번호가 일치하지 않습니다.' });
      changeForm({ field: 'register', key: 'password', value: '' });
      changeForm({ field: 'register', key: 'passwordConfirm', value: '' });
      return;
    }
    submitAuth({ field: 'register' });
  };

  return (
    <>
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
        <S_CyanButton size={'fullWidth'} disabled={authLoading.register} onClick={onSubmit}>
          회원가입 <LoadingSpinner visible={authLoading.register} width={'20px'} color={`red`} />
        </S_CyanButton>
        <S_Container>
          <StyleLink to={'/login'} size={'small'}>
            로그인
          </StyleLink>
        </S_Container>
      </S_Wrapper>
      <ErrorBox visible={error.state} errorMessage={error.message} onClick={closeErrorBox} />
    </>
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

const S_Container = styled.div`
  width: 100%;
  padding-right: 1rem;
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-end' })}
`;