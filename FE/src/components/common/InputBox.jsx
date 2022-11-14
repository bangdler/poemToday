import React from 'react';
import styled from 'styled-components';

export default function InputBox({ title, onChange, value, type = 'text', verification = false, errorNote = '' }) {
  return (
    <S_Wrapper>
      <S_Title>{title}</S_Title>
      <S_Input type={type} onChange={onChange} value={value} />
      <S_Span>{!verification && errorNote}</S_Span>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  height: 80px;
  margin: 10px 0;
  width: 90%;
`;

const S_Title = styled.h2`
  width: 100%;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
  margin-bottom: 0.5rem;
`;

const S_Input = styled.input`
  box-sizing: border-box;
  width: 100%;
  border-bottom: ${({ theme }) => theme.mode.borderColor};
  font-size: 2rem;
  color: ${({ theme }) => theme.mode.textColor};
  margin-bottom: 0.5rem;
`;

const S_Span = styled.span`
  width: 100%;
  color: red;
  font-size: 1rem;
  height: 20px;
`;
