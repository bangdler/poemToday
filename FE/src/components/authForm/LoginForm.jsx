import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Eye } from '@/assets/icons/eye-fill.svg';
import { ReactComponent as EyeSlash } from '@/assets/icons/eye-slash-fill.svg';
import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StyleLink from '@/components/common/StyleLink';
import { S_CyanButton } from '@/components/commonStyled/styleButtons';
import { AuthContext, AuthDispatchContext, useAuth } from '@/context/AuthProvider';
import { LoadingContext } from '@/context/LoadingProvider';
import { UserContext, useUser } from '@/context/UserProvider';
import { LoginServerErrorMessages } from '@/utils/constants';

export default function LoginForm() {
  const authForm = useContext(AuthContext);
  const { initializeForm, changeForm } = useContext(AuthDispatchContext);
  const { submitAuth } = useAuth();
  const userData = useContext(UserContext);
  const { checkUser } = useUser();
  const loading = useContext(LoadingContext);
  const [error, setError] = useState({ state: false, message: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    initializeForm({ field: 'login' });
    return () => initializeForm({ field: 'login' });
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
      console.log('로그인성공');
      console.log(authForm.authResponse);
      //유저 체크
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
    changeForm({ field: 'login', key: target.name, value: target.value });
  };

  const closeErrorBox = async () => {
    setError({ state: false, message: '' });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await closeErrorBox();
    if ([authForm.login.username, authForm.login.password].includes('')) {
      setError({ state: true, message: '빈 칸을 모두 입력하세요.' });
      return;
    }
    submitAuth({ field: 'login' });
  };

  const clickShowPasswordBtn = e => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <>
      <S_Wrapper>
        <InputBox
          title={'아이디'}
          name={'username'}
          value={authForm.login.username}
          onChange={onChange}
          autoComplete={'username'}
        />
        <InputBox
          title={'비밀번호'}
          name={'password'}
          value={authForm.login.password}
          type={showPassword ? 'text' : 'password'}
          onChange={onChange}
          autoComplete={'new-password'}
          option={{
            component: showPassword ? (
              <Eye width={22} height={22} viewBox="0 0 16 16" />
            ) : (
              <EyeSlash width={22} height={22} viewBox="0 0 16 16" />
            ),
            onClick: clickShowPasswordBtn,
          }}
        />
        <S_CyanButton size={'fullWidth'} disabled={loading.login} onClick={onSubmit}>
          로그인 <LoadingSpinner visible={loading.login} width={'20px'} color={`red`} />
        </S_CyanButton>
        <S_Container>
          <StyleLink to={'/register'} size={'small'}>
            회원가입
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
