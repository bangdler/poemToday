import React from 'react';

import { ThemeProvider } from '@/context/ThemeProvider';
import Router from '@/Router';
import { GlobalStyle } from '@/style/global';

function App() {
  return (
    <>
      <div className="app">
        <ThemeProvider>
          <GlobalStyle />
          <Router />
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
