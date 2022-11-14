import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import { S_Button } from '@/components/common/styleButtons';
import StyleLink from '@/components/common/StyleLink';
import { AuthContext, AuthDispatchContext } from '@/context/AuthProvider';
import palette from '@/style/palette';

export default function LoginForm() {
  const authForm = useContext(AuthContext);
  const { initializeForm, changeForm } = useContext(AuthDispatchContext);
  const [verifications, setVerifications] = useState({ state: true, type: 200 });

  useEffect(() => {
    initializeForm({ field: 'login' });
  }, []);

  const onChange = ({ target }) => {
    changeForm({ field: 'login', key: target.name, value: target.value });
  };

  const closeErrorBox = () => {
    setVerifications({ state: true, type: 200 });
  };

  // TODO: 서버 error 종류 400(아이디, 비번 형식 오류), 401(없는 아이디, 잘못된 비번), 409(회원가입시 아이디중복),
  const errorNotes = {
    400: '아이디, 비밀번호 형식이 잘못되었습니다.',
    401: '없는 아이디거나 잘못된 비밀번호입니다.',
    409: '이미 존재하는 아이디입니다.',
    500: '서버 응답 오류',
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
      {!verifications.state && <ErrorBox errorNote={errorNotes[verifications.type]} onClick={closeErrorBox} />}
      <S_CyanButton size={'fullWidth'}>로그인</S_CyanButton>
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
