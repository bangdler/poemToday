import React from 'react';
import styled, { css } from 'styled-components';

export default function TextBtn({ text, size = 'small', onClick }) {
  return (
    <S_Button size={size} onClick={onClick}>
      {text}
    </S_Button>
  );
}

const S_Button = styled.button`
  border-radius: 10%;
  padding: 0.25rem 1rem;
  color: ${({ theme }) => theme.mode.textColor};
  background-color: ${({ theme }) => theme.mode.bgColor};
  box-shadow: 0 5px 10px rgba(40, 40, 40, 1);

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  ${({ size }) => {
    if (size === 'small') {
      return css`
        height: 32px;
        font-size: 1.2rem;
        font-weight: bold;
      `;
    }
  }}
`;
