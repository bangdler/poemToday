import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
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

const initialForm = {
  username: '',
  password: '',
  passwordConfirm: '',
};

export default function RegisterForm() {
  const auth = useContext(AuthContext);
  const { initializeAuth } = useContext(AuthDispatchContext);
  const { submitAuth } = useAuth();
  const userData = useContext(UserContext);
  const { checkUser } = useUser();
  const loading = useContext(LoadingContext);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({ state: false, message: '' });
  const [showPassword, setShowPassword] = useState({ password: false, passwordConfirm: false });
  const navigate = useNavigate();

  useEffect(() => {
    initializeAuth();
    return () => initializeAuth();
  }, []);

  useEffect(() => {
    if (auth.error) {
      const errorStatus = auth.error.response.status;
      setError({ state: true, message: LoginServerErrorMessages[errorStatus] });
      return;
    }
    if (auth.response) {
      // 유저 체크
      checkUser();
    }
    setError({ state: false, message: '' });
  }, [auth.response, auth.error]);

  useEffect(() => {
    if (userData.user) {
      navigate('/');
    }
  }, [userData.user]);

  const onChange = useCallback(({ target }) => {
    setForm(form => {
      return { ...form, [target.name]: target.value };
    });
  }, []);

  const closeErrorBox = useCallback(async () => {
    setError({ state: false, message: '' });
  }, []);

  const onSubmit = async e => {
    e.preventDefault();
    await closeErrorBox();
    if ([form.username, form.password, form.passwordConfirm].includes('')) {
      setError({ state: true, message: '빈 칸을 모두 입력하세요.' });
      return;
    }
    if (form.password !== form.passwordConfirm) {
      setError({ state: true, message: '비밀번호가 일치하지 않습니다.' });
      setForm(form => {
        return { ...form, password: '', passwordConfirm: '' };
      });
      return;
    }
    submitAuth({ field: 'register', username: form.username, password: form.password });
  };

  const clickShowPasswordButton = useCallback(e => {
    e.preventDefault();
    const field = e.currentTarget.name;
    setShowPassword(prev => {
      return {
        ...prev,
        [field]: !prev[field],
      };
    });
  }, []);

  const passwordOption = useMemo(() => {
    return {
      component: {
        text: <Eye width={22} height={22} viewBox="0 0 16 16" />,
        password: <EyeSlash width={22} height={22} viewBox="0 0 16 16" />,
      },
      onClick: clickShowPasswordButton,
    };
  }, [clickShowPasswordButton]);

  return (
    <>
      <S_Wrapper>
        <InputBox
          title={'아이디'}
          name={'username'}
          value={form.username}
          onChange={onChange}
          autoComplete={'username'}
        />
        <InputBox
          title={'비밀번호'}
          name={'password'}
          value={form.password}
          type={showPassword.password ? 'text' : 'password'}
          onChange={onChange}
          autoComplete={'new-password'}
          option={passwordOption}
        />
        <InputBox
          title={'비밀번호 확인'}
          name={'passwordConfirm'}
          value={form.passwordConfirm}
          type={showPassword.passwordConfirm ? 'text' : 'password'}
          onChange={onChange}
          autoComplete={'new-password'}
          option={passwordOption}
        />
        <S_CyanButton type="submit" size={'fullWidth'} disabled={loading.register} onClick={onSubmit}>
          회원가입 <LoadingSpinner visible={loading.register} width={'20px'} color={`red`} />
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
