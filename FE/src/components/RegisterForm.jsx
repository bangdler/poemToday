import React, { useState } from 'react';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import InputBox from '@/components/common/InputBox';
import { S_Button } from '@/components/common/styleButtons';
import StyleLink from '@/components/common/StyleLink';
import palette from '@/style/palette';

export default function RegisterForm() {
  const [loginState, setLoginState] = useState({ id: '', password: '', confirm: '' });
  const [verifications, setVerifications] = useState({ state: true, type: 200 });

  const changeId = ({ target }) => {
    setLoginState({ ...loginState, id: target.value });
  };

  const changePassword = ({ target }) => {
    setLoginState({ ...loginState, password: target.value });
  };

  const changeConfirm = ({ target }) => {
    setLoginState({ ...loginState, confirm: target.value });
  };

  const closeErrorBox = () => {
    setVerifications(true);
  };

  return (
    <S_Wrapper>
      <InputBox title={'아이디'} value={loginState.id} onChange={changeId} />
      <InputBox title={'비밀번호'} value={loginState.password} type={'password'} onChange={changePassword} />
      <InputBox title={'비밀번호 확인'} value={loginState.confirm} type={'password'} onChange={changeConfirm} />
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
