import React from 'react';
import styled from 'styled-components';

import palette from '@/style/palette';

export default function InputBox({ title, onChange, value, type = 'text' }) {
  return (
    <S_Wrapper>
      <S_Title>{title}</S_Title>
      <S_Input type={type} onChange={onChange} value={value} autoComplete="new-password" />
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  width: 100%;
`;

const S_Title = styled.h2`
  width: 100%;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
  margin-bottom: 1rem;
`;

const S_Input = styled.input`
  width: 100%;
  border-bottom: ${({ theme }) => theme.mode.borderColor};
  font-size: 2rem;
  color: ${({ theme }) => theme.mode.textColor};
  &:focus {
    border-bottom: 1px solid ${palette.gray[7]};
  }
`;
