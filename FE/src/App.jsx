import React from 'react';

import AuthProvider from '@/context/AuthProvider';
import LoadingProvider from '@/context/LoadingProvider';
import PoemListProvider from '@/context/PoemListProvider';
import PoemProvider from '@/context/PoemProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import UserProvider from '@/context/UserProvider';
import Router from '@/Router';
import { GlobalStyle } from '@/style/global';

function App() {
  return (
    <div className="app">
      <ThemeProvider>
        <LoadingProvider>
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
        </LoadingProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
