import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { ReactComponent as Search } from '@/assets/icons/search.svg';
import StyleLink from '@/components/common/StyleLink';
import UtilBtn from '@/components/common/UtilBtn';
import { S_TextBtn } from '@/components/commonStyled/styleButtons';
import ThemeBtn from '@/components/ThemeBtn';
import { AuthContext, useAuth } from '@/context/AuthProvider';

export default function UtilArea() {
  const authForm = useContext(AuthContext);
  const { logoutUser } = useAuth();
  const navigate = useNavigate();

  const clickCancelBtn = () => {
    logoutUser();
    navigate('/');
  };

  return (
    <S_Wrapper>
      <UtilBtn blindText={'검색'}>
        <Search width={22} height={22} viewBox="0 0 16 16" />
      </UtilBtn>
      <ThemeBtn />
      {authForm.user ? (
        <S_TextBtn size={'xs'} onClick={clickCancelBtn}>
          로그아웃
        </S_TextBtn>
      ) : (
        <StyleLink to={'/login'}>로그인</StyleLink>
      )}
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
