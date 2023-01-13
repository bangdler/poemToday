import React from 'react';

import ContextsProvider from '@/context/ContextsProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import Router from '@/Router';
import { GlobalStyle } from '@/style/global';

function App() {
  return (
    <div className="app">
      <ThemeProvider>
        <ContextsProvider>
          <GlobalStyle />
          <Router />
        </ContextsProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
