import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { S_TextBtn } from '@/components/common/styleButtons';

export default React.memo(function ErrorBox({ errorNote, onClick }) {
  const [timer, setTimer] = useState(6);

  useEffect(() => {
    setTimeout(() => onClick(), timer * 1000);
  }, []);

  useEffect(() => {
    if (timer < 0) return;
    setInterval(() => setTimer(timer - 1), 1000);
  }, [timer]);

  return (
    <>
      <S_Wrapper timer={timer}>
        <S_Wrapper2>
          <S_Message>{errorNote}</S_Message>
          <S_WhiteTextBtn size={'xs'} onClick={onClick}>
            닫기
          </S_WhiteTextBtn>
        </S_Wrapper2>
        <p>{timer}초 뒤에 자동 닫힘</p>
      </S_Wrapper>
    </>
  );
});

const S_Wrapper = styled.div`
  background-color: tomato;
  color: white;
  border-radius: 10px;
  padding: 1.6rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  transition: all 1s;
  opacity: ${({ timer }) => (timer === 6 || timer === 1 ? 0 : 1)};
`;

const S_Wrapper2 = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})}
  margin: 5px 0;
`;

const S_Message = styled.p`
  font-size: 1.6rem;
  margin: 0 10px;
`;

const S_WhiteTextBtn = styled(S_TextBtn)`
  color: white;
  &:hover {
    color: rgba(0, 0, 0, 0.2);
  }
`;
