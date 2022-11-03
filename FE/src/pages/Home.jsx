import React from 'react';
import styled from 'styled-components';

import Header from '@/components/Header';

export default function Home() {
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
