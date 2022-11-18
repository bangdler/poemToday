import React from 'react';
import styled from 'styled-components';

export default function CheckBox({ onChange, checked, value, text, color }) {
  return (
    <S_Label htmlFor={value} checked={checked} color={color}>
      <S_CheckInput id={value} onChange={onChange} checked={checked} />
      <S_Text>{text}</S_Text>
    </S_Label>
  );
}

const S_Label = styled.label`
  height: 22px;
  width: 66px;
  border-radius: 4px;
  ${({ theme }) => theme.mixin.flexBox({})}
  background-color: ${({ color }) => color};
  opacity: ${({ checked }) => (checked ? 1 : 0.4)};
  cursor: pointer;
  padding: 0.2rem;
`;

const S_CheckInput = styled.input.attrs(() => ({ type: 'checkbox' }))`
  height: 14px;
  width: 14px;
  cursor: pointer;
  margin-right: 0.3rem;
  &:checked ~ span {
    color: ${({ theme }) => theme.mode.textColor};
  }
`;

const S_Text = styled.span`
  text-align: center;
  font-size: 1.6rem;
  color: rgba(0, 0, 0, 0.2);
  user-select: none;
`;
