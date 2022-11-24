import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import Header from '@/components/Header';
import { UserDispatchContext, useUser } from '@/context/UserProvider';

export default function Home() {
  const { setUser } = useContext(UserDispatchContext);
  const { checkUser } = useUser();

  useEffect(() => {
    try {
      const user = localStorage.getItem('user');
      if (!user) return;
      setUser({ user: JSON.parse(user) });
      checkUser();
    } catch (e) {
      console.log('localStorage is not working');
    }
  }, []);

  return (
    <>
      <Header />
      <S_Div></S_Div>
      <S_Div2></S_Div2>
    </>
  );
}

const S_Div = styled.div`
  height: 1000px;
`;

const S_Div2 = styled.div`
  background-color: #ffd700;
  height: 1000px;
`;
