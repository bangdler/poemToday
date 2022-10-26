import React, { createContext, useContext, useState } from 'react';
import { ThemeProvider as StyledProvider } from 'styled-components';

import { theme } from '@/style/theme.js';

const ThemeContext = createContext({});

export function ThemeProvider({ children }) {
  const [themeMode, setThemeMode] = useState('light');
  const themeObject = themeMode === 'light' ? theme.lightTheme : theme.darkTheme;
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
    } else {
      setThemeMode('light');
    }
  };

  return [themeMode, toggleThemeMode];
}
