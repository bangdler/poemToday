import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function StyleLink(props) {
  return <S_Link {...props} />;
}

const S_Link = styled(Link)`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: ${({ theme }) => theme.mode.borderColor};
  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }
`;
