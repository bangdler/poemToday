import React from 'react';
import styled from 'styled-components';

import { CategoryStyle } from '@/style/common';

export default function CheckBox({ onChange, checked, value, text, color, size = 'small' }) {
  return (
    <S_Label htmlFor={value} checked={checked} color={color} size={size}>
      <S_CheckInput id={value} onChange={onChange} checked={checked} />
      <S_Text>{text}</S_Text>
    </S_Label>
  );
}

const S_Label = styled.label`
  ${CategoryStyle};
  opacity: ${({ checked }) => (checked ? 1 : 0.4)};
  cursor: pointer;
`;

const S_CheckInput = styled.input.attrs(() => ({ type: 'checkbox' }))`
  height: 14px;
  width: 14px;
  cursor: pointer;
  margin-right: 0.3rem;
  &:checked ~ span {
    color: black;
  }
`;

const S_Text = styled.span`
  color: rgba(0, 0, 0, 0.2);
`;
