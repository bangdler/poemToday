import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import { AuthContext } from '@/context/AuthProvider';

export default function GNB() {
  const authForm = useContext(AuthContext);

  return (
    <S_Nav>
      <ul>
        <li>
          <Link to={'/topics'}>주제별 보기</Link>
        </li>
        <li>{authForm.user ? <Link to={'/write'}>시 쓰기</Link> : ''}</li>
      </ul>
    </S_Nav>
  );
}

const S_Nav = styled.nav`
  height: 100%;
  font-size: 2rem;
  flex-grow: 1;
  ${({ theme }) => theme.mixin.flexBox({})};
  > ul {
    ${({ theme }) => theme.mixin.flexBox({})};
    :hover li:not(:hover) {
      opacity: 0.5;
    }
  }

  > ul > li {
    padding: 0 10px;
  }
`;