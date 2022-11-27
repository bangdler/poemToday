import React from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';

export default function StyleLink(props) {
  return <S_Link {...props} />;
}

const S_Link = styled(Link)`
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: 1px solid ${({ theme }) => theme.mode.borderColor};
  &:hover {
    border-color: ${({ theme }) => theme.mode.textColor};
  }

  ${({ size }) => {
    if (size === 'small') {
      return css`
        font-size: 1.6rem;
      `;
    }
    if (size === 'medium') {
      return css`
        font-size: 2.4rem;
        font-weight: bold;
      `;
    }
  }};
`;
