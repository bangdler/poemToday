import React, { useState, useEffect, useRef, useContext } from 'react';
import styled from 'styled-components';

import Logo from '@/components/common/Logo';
import GNB from '@/components/header/GNB';
import UtilArea from '@/components/header/UtilArea';
import { UserContext, useUser } from '@/context/UserProvider';
import { firstAndDebounce } from '@/utils/util';

export default function Header() {
  const userData = useContext(UserContext);
  const { logoutUser } = useUser();
  const [position, setPosition] = useState('top');
  const curPageY = useRef(0);

  const handleScroll = firstAndDebounce(() => {
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
  }, 150);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll); //clean up
    };
  }, []);

  return (
    <>
      <S_Header position={position}>
        <S_Wrapper>
          <Logo name={'Today Poem'} link={'/'} blindText={'홈으로 이동합니다.'} />
          <GNB user={userData.user} />
          <UtilArea user={userData.user} logoutUser={logoutUser} />
        </S_Wrapper>
      </S_Header>
      <S_Spacer />
    </>
  );
}

const S_Header = styled.header`
  position: fixed;
  width: 100%;
  top: 0;
  left: 0;
  height: 72px;
  background-color: ${({ theme }) => theme.mode.bgColor};
  border-bottom: ${({ position }) => (position === 'up' ? `1px solid #eee` : ``)};
  transform: ${({ position }) => (position === 'down' ? `translateY(-72px)` : `translateY(0)`)};
  transition: transform 0.5s ease-out;
  z-index: 10; // quill 컴포넌트 내부에 z-index 가 있는 것으로 추정되어 적용함.
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

const S_Spacer = styled.div`
  height: 72px;
`;
