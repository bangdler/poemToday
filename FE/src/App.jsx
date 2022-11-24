import React from 'react';

import AuthProvider from '@/context/AuthProvider';
import PoemListProvider from '@/context/PoemListProvider';
import PoemProvider from '@/context/PoemProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import UserProvider from '@/context/UserProvider';
import Router from '@/Router';
import { GlobalStyle } from '@/style/global';

function App() {
  return (
    <>
      <div className="app">
        <ThemeProvider>
          <UserProvider>
            <AuthProvider>
              <PoemListProvider>
                <PoemProvider>
                  <GlobalStyle />
                  <Router />
                </PoemProvider>
              </PoemListProvider>
            </AuthProvider>
          </UserProvider>
        </ThemeProvider>
      </div>
    </>
  );
}

export default App;
