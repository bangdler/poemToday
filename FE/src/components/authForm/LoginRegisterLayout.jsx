import React from 'react';
import styled from 'styled-components';

import { DimLayerStyle } from '@/style/common';

export default function LoginRegisterLayout({ children }) {
  console.log('layout')
  return (
    <S_DimLayer>
      <S_InnerBox>{children}</S_InnerBox>
    </S_DimLayer>
  );
}

const S_DimLayer = styled.div`
  ${DimLayerStyle};
`;

const S_InnerBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background: ${({ theme }) => theme.mode.dimColor};
  color: ${({ theme }) => theme.mode.textColor};
  border-radius: 2px;
`;
