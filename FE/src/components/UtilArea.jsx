import React from 'react';
import styled from 'styled-components';

import { ReactComponent as Search } from '@/assets/icons/search.svg';
import { S_TextBtn } from '@/components/common/styleButtons';
import StyleLink from '@/components/common/StyleLink';
import UtilBtn from '@/components/common/UtilBtn';
import ThemeBtn from '@/components/ThemeBtn';

export default function UtilArea() {
  return (
    <S_Wrapper>
      <UtilBtn blindText={'검색'}>
        <Search width={22} height={22} viewBox="0 0 16 16" />
      </UtilBtn>
      <ThemeBtn />
      <StyleLink url={'/login'} content={'로그인'} />
      {/*<S_TextBtn size={'xs'}>로그아웃</S_TextBtn>*/}
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  height: 100%;
  ${({ theme }) => theme.mixin.flexBox({})};
  > * {
    margin: 0 10px;
  }
`;
