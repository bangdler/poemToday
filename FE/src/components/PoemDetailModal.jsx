import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import PoemCard from '@/components/PoemCard';

export default function PoemDetailModal({ children }) {
  const navigate = useNavigate();
  const [pop, setPop] = useState(true);

  useEffect(() => {
    if (!pop) {
      setTimeout(() => {
        navigate(-1);
      }, 500);
    }
  }, [pop]);

  const onClick = () => {
    setPop(false);
  };

  return (
    <S_DimLayer onClick={() => onClick()}>
      <S_InnerBox pop={pop}>
        {children}
        <PoemCard id={'id'} username={'username'} title={'title'} body={'body'} category={[]} />
      </S_InnerBox>
    </S_DimLayer>
  );
}

const S_DimLayer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  background: ${({ theme }) => theme.mode.dimColor};
  z-index: 20;
  ${({ theme }) => theme.mixin.flexBox({})};
`;

const S_InnerBox = styled.div`
  animation: ${({ pop }) => (pop ? 'popUp' : 'popDown')} 0.4s ease-in-out 0s 1 normal forwards;
  @keyframes popUp {
    0% {
      opacity: 0;
      transform: translateY(400px) scale(0.75);
    }
    75% {
      opacity: 1;
      transform: translateY(-16px) scale(1);
    }
    100% {
      opacity: 1;
      transform: translateY(0px);
    }
  }
  @keyframes popDown {
    0% {
      opacity: 1;
      transform: translateY(0px);
    }
    25% {
      opacity: 1;
      transform: translateY(-16px) scale(1);
    }
    100% {
      opacity: 0;
      transform: translateY(400px) scale(0.75);
    }
  }
`;
