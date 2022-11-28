import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

import { S_TextBtn } from '@/components/commonStyled/styleButtons';

export default React.memo(function ErrorBox({ errorMessage, onClick }) {
  let timer = useRef(null);
  let start;
  let enterTime;

  useEffect(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => onClick(), 3 * 1000);
    }
    start = Date.now();
    return () => clearTimeout(timer.current);
  }, []);

  const handleMouseEnter = () => {
    enterTime = Date.now();
    clearTimeout(timer.current);
  };

  const handleMouseLeave = () => {
    const diff = (enterTime - start) / 1000;
    timer.current = setTimeout(() => onClick(), 3 * 1000 - diff);
  };

  return (
    <>
      <S_Wrapper onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <S_Wrapper2>
          <S_Message>{errorMessage}</S_Message>
          <S_WhiteTextBtn size={'xs'} onClick={onClick}>
            닫기
          </S_WhiteTextBtn>
        </S_Wrapper2>
        <S_ProgressBar>
          <S_Progress></S_Progress>
        </S_ProgressBar>
      </S_Wrapper>
    </>
  );
});

const S_Wrapper = styled.div`
  z-index: 15;
  background-color: tomato;
  color: ${({ theme }) => theme.mode.textColor};
  border-radius: 10px;
  padding: 1.6rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  animation: fade 3s ease-in-out;
  animation-fill-mode: forwards;
  @keyframes fade {
    0%,
    100% {
      opacity: 0;
    }
    4%,
    96% {
      opacity: 1;
    }
  }
  &:hover {
    animation-play-state: paused;
    * {
      animation-play-state: paused;
    }
  }
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
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: 1px solid ${({ theme }) => theme.mode.borderColor};
  &:hover {
    border-color: ${({ theme }) => theme.mode.textColor};
  }
`;

const S_ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: #e1e1e1;
  position: relative;
  border-radius: 2px;
`;

const S_Progress = styled.div`
  background: red;
  position: absolute;
  height: 100%;
  border-radius: inherit;
  left: 0;
  top: 0;
  animation: progress 3s linear;
  animation-fill-mode: forwards;
  @keyframes progress {
    from {
      width: 0;
    }
    to {
      width: 100%;
    }
  }
`;
