import React from 'react';
import styled from 'styled-components';

import palette from '@/style/palette';

export default function LoginRegisterLayout({ children }) {
  return (
    <S_DimLayer>
      <S_InnerBox>{children}</S_InnerBox>
    </S_DimLayer>
  );
}

const S_DimLayer = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  background: ${palette.gray[2]};
  ${({ theme }) => theme.mixin.flexBox({})};
`;

const S_InnerBox = styled.div`
  box-shadow: 0 0 8px rgba(0, 0, 0, 0.025);
  padding: 2rem;
  width: 360px;
  background-color: ${({ theme }) => theme.mode.bgColor};
  color: ${({ theme }) => theme.mode.textColor};
  border-radius: 2px;
`;
