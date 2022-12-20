import React, { useCallback, useState } from 'react';
import styled from 'styled-components';

import UserProfile from '@/components/myPageForm/UserProfile';
import PoemCardContainer from '@/components/poemCards/PoemCardContainer';
import Palette from '@/style/palette';

const PROFILE_TAB = '유저프로필';
const MY_POEM_TAB = '내가 작성한 글';

export default function MyPageForm() {
  const tabMenu = [PROFILE_TAB, MY_POEM_TAB];
  const [selectTab, setSelectTab] = useState(tabMenu[0]);

  const onClickTab = useCallback(({ target }) => {
    setSelectTab(target.innerText);
  }, []);

  return (
    <S_Wrapper>
      <S_Navigation>
        {tabMenu.map((it, idx) => (
          <S_Tab key={idx} onClick={onClickTab} selected={it === selectTab}>
            {it}
          </S_Tab>
        ))}
      </S_Navigation>
      <S_Layout>
        {selectTab === PROFILE_TAB ? <UserProfile /> : null}
        {selectTab === MY_POEM_TAB ? <PoemCardContainer /> : null}
      </S_Layout>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  margin-top: 30px;
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })};
`;

const S_Tab = React.memo(styled.button`
  height: 40px;
  font-size: 1.6rem;
  border-radius: 4px 4px 0 0;
  border: 2px solid ${Palette.cyan[5]};
  padding: 0.25rem 1rem;
  background-color: ${Palette.cyan[5]};
  ${({ theme }) => theme.mixin.flexBox({})}
  color:${({ theme }) => theme.mode.textColor};
  border-color: ${({ selected, theme }) => (selected ? theme.mode.textColor : '')};
`);

const S_Navigation = styled.nav`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-start' })};
  > *:not(:last-child) {
    margin-right: 1rem;
    margin-left: 1rem;
  }
`;
const S_Layout = styled.div`
  width: 100%;
  padding: 1.5rem;
  border-radius: 4px;
  border: 1px solid ${({ theme }) => theme.mode.textColor};
  background: ${({ theme }) =>  theme.mode.cardColor };
`;
