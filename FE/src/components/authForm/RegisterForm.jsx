import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Eye } from '@/assets/icons/eye-fill.svg';
import { ReactComponent as EyeSlash } from '@/assets/icons/eye-slash-fill.svg';
import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import StyleLink from '@/components/common/StyleLink';
import { S_CyanButton, S_RedButton } from '@/components/commonStyled/styleButtons';
import { AuthContext, AuthDispatchContext, useAuth } from '@/context/AuthProvider';
import { LoadingContext } from '@/context/LoadingProvider';
import { UserContext, useUser } from '@/context/UserProvider';
import { useCounter } from '@/hooks/useCounter';
import palette from '@/style/palette';
import {
  EMAIL_VERIFICATION_EXPIRATION,
  LoginServerErrorMessages,
  VerifyEmailSeverErrorMessages,
} from '@/utils/constants';

const initialForm = {
  username: '',
  password: '',
  passwordConfirm: '',
  email: '',
  authCode: '',
};

export default function RegisterForm() {
  const auth = useContext(AuthContext);
  const { initializeAuth } = useContext(AuthDispatchContext);
  const { registerAuth, verifyEmail } = useAuth();
  const userData = useContext(UserContext);
  const { checkUser } = useUser();
  const loading = useContext(LoadingContext);
  const [form, setForm] = useState(initialForm);
  const [error, setError] = useState({ state: false, message: '' });
  const [showPassword, setShowPassword] = useState({ password: false, passwordConfirm: false });
  const [openAuthCode, setOpenAuthCode] = useState(false);
  const { count, startCount, stopCount, resetCount, getTimeFromCount } = useCounter({
    initialSeconds: EMAIL_VERIFICATION_EXPIRATION,
    interval: 1000,
  });
  const [time, setTime] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // initializeAuth();
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
      stopCount();
    }
    setError({ state: false, message: '' });
  }, [auth.response, auth.error]);

  useEffect(() => {
    if (userData.user) {
      navigate('/');
    }
  }, [userData.user]);

  useEffect(() => {
    if (auth.verifyError) {
      const errorStatus = auth.verifyError.response.status;
      setError({ state: true, message: VerifyEmailSeverErrorMessages[errorStatus] });
      return;
    }
    if (auth.verifyResponse) {
      // 처음 인증 코드 발송 시
      if (!openAuthCode) {
        setOpenAuthCode(true);
        startCount();
      } else {
        resetCount();
      }
      console.log(auth.verifyResponse.msg);
    }
    setError({ state: false, message: '' });
  }, [auth.verifyResponse, auth.verifyError]);

  useEffect(() => {
    if (count === 0) return stopCount();
    const [, minutes, seconds] = getTimeFromCount(count);
    setTime({ minutes, seconds });
  }, [count]);

  const onChange = useCallback(({ target }) => {
    setForm(form => {
      return { ...form, [target.name]: target.value };
    });
  }, []);

  const closeErrorBox = useCallback(async () => {
    setError({ state: false, message: '' });
  }, []);

  const onKeyDown = e => {
    if (e.key !== 'Enter') return;
    onSubmit(e);
  };

  const onSubmit = async e => {
    e.preventDefault();
    await closeErrorBox();
    if ([form.username, form.password, form.passwordConfirm, form.email, form.authCode].includes('')) {
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
    registerAuth({
      username: form.username,
      password: form.password,
      email: form.email,
      authCode: form.authCode,
    });
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

  const clickEmailVerifyButton = useCallback(
    async e => {
      e.preventDefault();
      await closeErrorBox();
      const regex = /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z]{2,6}$/;
      if (!regex.test(form.email)) {
        setError({ state: true, message: '이메일 형식을 확인해주세요.' });
        return;
      }
      verifyEmail({ email: form.email });
    },
    [form.email]
  );

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
      <S_Wrapper onKeyDown={onKeyDown}>
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
        <S_EmailContainer>
          <S_Wrapper2>
            <InputBox title={'이메일'} name={'email'} value={form.email} onChange={onChange} autoComplete={'email'} />
            <S_RedButton size={'medium'} onClick={clickEmailVerifyButton} disabled={!form.email || loading.verifyEmail}>
              인증코드 요청
            </S_RedButton>
          </S_Wrapper2>
          {openAuthCode && (
            <S_Wrapper3>
              <InputBox
                title={'인증코드'}
                name={'authCode'}
                value={form.authCode}
                onChange={onChange}
                autoComplete={'one-time-code'}
              />
              <S_Timer>
                {count
                  ? `${time?.minutes}분 ${time?.seconds}초 후에 만료됩니다.`
                  : '만료되었습니다. 다시 요청해주세요.'}
              </S_Timer>
            </S_Wrapper3>
          )}
        </S_EmailContainer>
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

const S_EmailContainer = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  > * {
    margin: 10px 0;
  }
`;

const S_Wrapper2 = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({ justify: 'space-between' })};
`;

const S_Wrapper3 = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column', align: 'flex-start' })}
  > *:not(:last-child) {
    margin-bottom: 5px;
  }
  animation: popUp 0.2s ease-in-out 0s 1 normal forwards;
  @keyframes popUp {
    0% {
      max-height: 0;
    }
    30% {
      max-height: 30px;
    }
    100% {
      max-height: 500px;
    }
  }
`;

const S_Timer = React.memo(styled.p`
  height: 10px;
  font-size: 1.2rem;
  color: ${palette.red[1]};
`);
