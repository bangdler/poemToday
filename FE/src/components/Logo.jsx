import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import BlindText from '@/components/common/BlindText';

export default function Logo({ name, link }) {
  return (
    <S_Logo>
      <Link to={link}>
        {name}
        <BlindText text={'홈으로 이동합니다.'} />
      </Link>
    </S_Logo>
  );
}

const S_Logo = styled.h1`
  font-size: 2.6rem;
  height: 100%;
  ${({ theme }) => theme.mixin.flexBox({})};
`;
