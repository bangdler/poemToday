import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export default function StyleLink({ url, content }) {
  return (
    <S_Wrapper>
      <Link to={url}>{content}</Link>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: ${({ theme }) => theme.mode.borderColor};
  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }
`;
