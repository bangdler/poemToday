import React from 'react';

import AuthProvider from '@/context/AuthProvider';
import PoemProvider from '@/context/PoemProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import Router from '@/Router';
import { GlobalStyle } from '@/style/global';

function App() {
  return (
    <>
      <div className="app">
        <ThemeProvider>
          <AuthProvider>
            <PoemProvider>
              <GlobalStyle />
              <Router />
            </PoemProvider>
          </AuthProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
