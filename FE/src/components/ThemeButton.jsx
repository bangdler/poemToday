import React from 'react';
import styled from 'styled-components';

import { useThemeMode } from '@/context/ThemeProvider';

export default function ThemeButton() {
  const [themeMode, toggleThemeMode] = useThemeMode();

  return <S_Button onClick={toggleThemeMode}>{themeMode === 'light' ? '🌝' : '🌚'}</S_Button>;
}

const S_Button = styled.button`
  background-color: ${props => props.theme.bgColor};
  border: ${props => props.theme.borderColor};
  font-size: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  box-shadow: ${props =>
    props.mode === 'dark'
      ? '0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)'
      : '0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)'};
`;
