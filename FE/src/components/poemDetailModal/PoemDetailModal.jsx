import React, { useEffect } from 'react';
import styled from 'styled-components';

export default function PoemDetailModal({ pop, closeModal, children }) {
  const disableScroll = () => {
    const scrollBarCompensation = window.innerWidth - document.body.offsetWidth;
    document.body.style.overflow = 'hidden';
    document.querySelector('#root').style.paddingRight = `${scrollBarCompensation}px`;
  };

  const enableScroll = () => {
    document.body.style.overflow = '';
    document.querySelector('#root').style.paddingRight = '';
  };

  useEffect(() => {
    disableScroll();
    return () => enableScroll();
  }, []);

  return (
    <S_DimLayer onClick={closeModal}>
      <S_InnerBox pop={pop}>{children}</S_InnerBox>
    </S_DimLayer>
  );
}

const S_DimLayer = styled.div`
  position: fixed;
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
