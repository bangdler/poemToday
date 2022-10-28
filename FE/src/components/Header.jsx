import React from 'react';
import styled from 'styled-components';

import GNB from '@/components/GNB';
import Logo from '@/components/Logo';
import UtilArea from '@/components/UtilArea';

export default function Header() {
  return (
    <S_Header>
      <Logo name={'Today Poem'} link={'/'} />
      <GNB />
      <UtilArea />
    </S_Header>
  );
}

const S_Header = styled.header`
  height: 72px;
  font-family: 'Gamja Flower';
  ${({ theme }) => theme.mixin.flexBox({ justify: 'space-between' })};
`;
