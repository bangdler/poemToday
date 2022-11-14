import React, { useState } from 'react';
import styled from 'styled-components';

import InputBox from '@/components/common/InputBox';

export default function LoginForm() {
  const [loginState, setLoginState] = useState({ id: '', password: '' });
  const [verifications, setVerifications] = useState({ id: true, password: true });

  const changeId = ({ target }) => {
    if (target.value.length < 4) {
      setVerifications({ ...verifications, id: false });
    } else {
      setVerifications({ ...verifications, id: true });
    }
    setLoginState({ ...loginState, id: target.value });
  };
  return (
    <S_Wrapper>
      <InputBox
        title={'아이디'}
        value={loginState.id}
        onChange={changeId}
        verification={verifications.id}
        errorNote={'아이디는 5글자 이상입니다.'}
      />
      <InputBox title={'비밀번호'} type={'password'} />
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  font-family: 'Gamja Flower';
  margin-top: 16px;
`;
