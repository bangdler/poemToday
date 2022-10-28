import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Search } from '@/assets/icons/search.svg';
import UtilBtn from '@/components/common/UtilBtn';
import ThemeBtn from '@/components/ThemeBtn';

export default function UtilArea() {
  return (
    <S_Wrapper>
      <UtilBtn blindText={'검색'}>
        <Search width={22} height={22} viewBox="0 0 16 16" />
      </UtilBtn>
      <ThemeBtn />
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  height: 100%;
  ${({ theme }) => theme.mixin.flexBox({})};
`;
