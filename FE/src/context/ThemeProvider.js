import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

import { common, lightTheme, darkTheme } from '@/style/theme.js';

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const localTheme = localStorage.getItem('theme') || 'light';
  const [themeMode, setThemeMode] = useState(localTheme);
  const themeObject = { mode: themeMode === 'light' ? lightTheme : darkTheme, ...common };
  return (
    <ThemeContext.Provider value={{ themeMode, setThemeMode }}>
      <StyledProvider theme={themeObject}>{children}</StyledProvider>
    </ThemeContext.Provider>
  );
}

export function useThemeMode() {
  const { themeMode, setThemeMode } = useContext(ThemeContext);

  const toggleThemeMode = () => {
    if (themeMode === 'light') {
      setThemeMode('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      setThemeMode('light');
      localStorage.setItem('theme', 'light');
    }
  };

  return [themeMode, toggleThemeMode];
}
