import React, { useCallback, useContext, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Search } from '@/assets/icons/search.svg';
import StyleLink from '@/components/common/StyleLink';
import UtilBtn from '@/components/common/UtilBtn';
import { S_TextBtn } from '@/components/commonStyled/styleButtons';
import ThemeBtn from '@/components/header/ThemeBtn';
import { PoemListDispatchContext } from '@/context/PoemListProvider';

export default React.memo(function UtilArea({ user, logoutUser }) {
  const { initializePoemList } = useContext(PoemListDispatchContext);
  const navigate = useNavigate();

  const clickLogoutBtn = () => {
    logoutUser();
    navigate('/');
  };

  const clickSearchBtn = useCallback(() => {
    initializePoemList();
    navigate('/search');
  }, [initializePoemList]);

  const memoizedSearch = useMemo(() => {
    return <Search width={22} height={22} viewBox="0 0 16 16" />;
  }, []);

  return (
    <S_Wrapper>
      <UtilBtn blindText={'검색'} onClick={clickSearchBtn}>
        {memoizedSearch}
      </UtilBtn>
      <ThemeBtn />
      {user ? (
        <S_TextBtn size={'xs'} onClick={clickLogoutBtn}>
          로그아웃
        </S_TextBtn>
      ) : (
        <StyleLink to={'/login'} size={'small'}>
          로그인
        </StyleLink>
      )}
    </S_Wrapper>
  );
});

const S_Wrapper = styled.div`
  height: 100%;
  ${({ theme }) => theme.mixin.flexBox({})};
  > *:not(:last-child) {
    margin-right: 1.6rem;
  }
`;
