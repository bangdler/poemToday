import React, { useContext } from 'react';
import styled from 'styled-components';

import { PoemListContext } from '@/context/PoemListProvider';
import { UserContext } from '@/context/UserProvider';
import Palette from '@/style/palette';

export default function UserProfile() {
  const userData = useContext(UserContext);
  const poemListData = useContext(PoemListContext);

  return (
    <S_Wrapper>
      <h2>유저 프로필</h2>
      <p>User name : {userData.user?.username}</p>
      <p>작성한 글 수 : {poemListData.poemList?.length}개</p>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  height: 400px;
  > h2 {
    font-size: 3rem;
    font-weight: bold;
    color: ${Palette.cyan[4]};
  }
  > p {
    font-size: 2.4rem;
  }
  > * {
    margin-left: 2rem;
  }
  > *:not(:last-child) {
    margin-bottom: 2rem;
  }
`;
