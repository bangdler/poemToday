import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import GNB from '@/components/GNB';
import Logo from '@/components/Logo';
import UtilArea from '@/components/UtilArea';

export default function Header() {
  const [pageY, setPageY] = useState(0);
  const [position, setPosition] = useState('top');

  const handleScroll = () => {
    const { scrollY } = window;
    const dY = pageY - scrollY;
    if (scrollY === 0) {
      setPosition('top');
    } else if (dY < 0) {
      setPosition('hide');
    } else {
      setPosition('up');
    }
    setPageY(scrollY);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, [pageY]);

  return (
    <S_Header position={position}>
      <S_Wrapper position={position}>
        <Logo name={'Today Poem'} link={'/'} />
        <GNB />
        <UtilArea />
      </S_Wrapper>
    </S_Header>
  );
}

const S_Header = styled.header`
  position: fixed;
  width: 100vw;
  top: 0;
  left: 0;
  height: 72px;
  font-family: 'Gamja Flower';
  transform: ${({ position }) => (position === 'hide' ? `translateY(-72px)` : `translateY(0)`)};
  transition: transform 0.5s ease-out;
`;

const S_Wrapper = styled.div`
  background-color: red;
  margin: 0 auto;
  height: 100%;
  border-bottom: ${({ position }) => (position === 'up' ? `1px solid #333` : ``)};
  @media screen and ${({ theme }) => theme.device.tablet} {
    width: 80%;
    min-width: 768px;
  }

  @media screen and ${({ theme }) => theme.device.laptop} {
    width: 90%;
    max-width: 1824px;
  }
  ${({ theme }) => theme.mixin.flexBox({ justify: 'space-between' })};
`;
