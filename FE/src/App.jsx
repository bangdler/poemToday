import React from 'react';

import AuthProvider from '@/context/AuthProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import Router from '@/Router';
import { GlobalStyle } from '@/style/global';

function App() {
  return (
    <>
      <div className="app">
        <ThemeProvider>
          <AuthProvider>
            <GlobalStyle />
            <Router />
          </AuthProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
