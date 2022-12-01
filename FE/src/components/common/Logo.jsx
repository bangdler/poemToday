import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import BlindText from '@/components/common/BlindText';

export default function Logo({ name, link, blindText }) {
  return (
    <S_Logo>
      <Link to={link}>
        {name}
        <BlindText text={blindText} />
      </Link>
    </S_Logo>
  );
}

const S_Logo = styled.h1`
  font-size: 2.6rem;
  height: 100%;
  ${({ theme }) => theme.mixin.flexBox({})};
`;
