import React from 'react';
import styled from 'styled-components';

export const S_TitleInput = React.memo(styled.input`
  height: 60px;
  width: 50%;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: 1px solid ${({ theme }) => theme.mode.borderColor};
`);

export const S_AuthorInput = React.memo(styled.input`
  height: 22px;
  width: 30%;
  font-size: 2rem;
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: 1px solid ${({ theme }) => theme.mode.borderColor};
`);
