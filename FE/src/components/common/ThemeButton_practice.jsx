import React from 'react';
import styled from 'styled-components';

import { useThemeMode } from '@/context/ThemeProvider';

export default function ThemeButton_practice() {
  const [themeMode, toggleThemeMode] = useThemeMode();

  return (
    <S_Button onClick={toggleThemeMode} mode={themeMode}>
      {themeMode === 'light' ? <span>🌝</span> : <span>🌚</span>}
    </S_Button>
  );
}

const S_Button = styled.button`
  background-color: ${({ theme }) => theme.mode.bgColor};
  border: 1px solid ${({ theme }) => theme.mode.borderColor};
  padding: 0 15px;
  font-size: 20px;
  display: flex;
  align-items: center;
  width: 96px;
  height: 48px;
  border-radius: 30px;
  box-shadow: ${props =>
    props.mode === 'dark'
      ? '0px 5px 10px rgba(40, 40, 40, 1), 0px 2px 4px rgba(40, 40, 40, 1)'
      : '0 5px 10px rgba(100, 100, 100, 0.15), 0 2px 4px rgba(100, 100, 100, 0.15)'};
  span {
    transform: ${({ mode }) => (mode === 'dark' ? 'translateX(44px)' : 'translateX(0)')};
    transition: transform 0.5s ease-out;
  }
  transition: all 0.5s ease-out;
`;
