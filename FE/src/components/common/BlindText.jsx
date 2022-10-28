import React from 'react';
import styled from 'styled-components';

export default function BlindText({ text }) {
  return <S_Span>{text}</S_Span>;
}

const S_Span = styled.span`
  border: 0;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  width: 1px;
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  white-space: nowrap;
`;
