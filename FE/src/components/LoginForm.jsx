import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import { S_Button } from '@/components/common/styleButtons';
import StyleLink from '@/components/common/StyleLink';
import { AuthContext, AuthDispatchContext, useSubmitAuth } from '@/context/AuthProvider';
import palette from '@/style/palette';
import { ServerErrorNotes } from '@/utils/constants';

export default function LoginForm() {
  const authForm = useContext(AuthContext);
  const { initializeForm, changeForm } = useContext(AuthDispatchContext);
  const [authLoading, submitAuth] = useSubmitAuth();
  const [verifications, setVerifications] = useState({ state: true, errorMsg: '' });

  useEffect(() => {
    initializeForm({ field: 'login' });
  }, []);

  useEffect(() => {
    if (authForm.authError) {
      console.log('오류 발생');
      console.log(authForm.authError);
      setVerifications({ state: false, errorMsg: ServerErrorNotes[authForm.authError.status] });
    }
    if (authForm.authResponse) {
      console.log('로그인성공');
      console.log(authForm.authResponse);
      //유저 체크
    }
  }, [authForm.authResponse, authForm.authError]);

  const onChange = ({ target }) => {
    changeForm({ field: 'login', key: target.name, value: target.value });
  };

  const closeErrorBox = () => {
    setVerifications({ state: true, errorMsg: '' });
  };

  const onSubmit = e => {
    e.preventDefault();
    submitAuth({ type: 'login' });
  };

  return (
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
        type={'password'}
        onChange={onChange}
        autoComplete={'new-password'}
      />
      {!verifications.state && <ErrorBox errorNote={verifications.errorMsg} onClick={closeErrorBox} />}
      <S_CyanButton size={'fullWidth'} disabled={authLoading.login} onClick={onSubmit}>
        로그인
      </S_CyanButton>
      <S_Container>
        <StyleLink url={'/register'} content={'회원가입'} />
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
  &:hover { background-color: ${palette.cyan[4]}
`;

const S_Container = styled.div`
  width: 100%;
  padding-right: 1rem;
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-end' })}
`;
