import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';

import GNB from '@/components/GNB';
import Logo from '@/components/Logo';
import UtilArea from '@/components/UtilArea';
import { firstAndDebounce } from '@/utils/util';

export default function Header() {
  const [position, setPosition] = useState('top');
  const curPageY = useRef(0);

  const handleScroll = () => {
    const { scrollY } = window;
    const dY = curPageY.current - scrollY;

    if (scrollY === 0) {
      setPosition('top');
    } else if (dY < 0) {
      setPosition('down');
    } else if (dY > 0) {
      setPosition('up');
    }
    curPageY.current = scrollY;
  };

  useEffect(() => {
    window.addEventListener('scroll', firstAndDebounce(handleScroll, 150));
    return () => {
      window.removeEventListener('scroll', firstAndDebounce(handleScroll, 150)); //clean up
    };
  }, []);

  return (
    <S_Header position={position}>
      <S_Wrapper>
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
  border-bottom: ${({ position }) => (position === 'up' ? `1px solid #eee` : ``)};
  transform: ${({ position }) => (position === 'down' ? `translateY(-72px)` : `translateY(0)`)};
  transition: transform 0.5s ease-out;
`;

const S_Wrapper = styled.div`
  margin: 0 auto;
  height: 100%;
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
