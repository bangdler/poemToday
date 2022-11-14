import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import { S_Button } from '@/components/common/styleButtons';
import StyleLink from '@/components/common/StyleLink';
import { AuthContext, AuthDispatchContext } from '@/context/AuthProvider';
import palette from '@/style/palette';

export default function RegisterForm() {
  const authForm = useContext(AuthContext);
  const { initializeForm, changeForm } = useContext(AuthDispatchContext);
  const [verifications, setVerifications] = useState({ state: true, type: 200 });

  useEffect(() => {
    initializeForm({ field: 'register' });
  }, []);

  const onChange = ({ target }) => {
    changeForm({ field: 'register', key: target.name, value: target.value });
  };

  const closeErrorBox = () => {
    setVerifications({ state: true, type: 200 });
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
      {!verifications.state && <ErrorBox errorNote={''} onClick={closeErrorBox} />}
      <S_CyanButton size={'fullWidth'}>회원가입</S_CyanButton>
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
  &:hover { background-color: ${palette.cyan[4]}
`;

const S_Container = styled.div`
  width: 100%;
  padding-right: 1rem;
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-end' })}
`;
