import React from 'react';
import { HelmetProvider } from 'react-helmet-async';

import BaseMeta from '@/components/metaComponents/BaseMeta';
import ContextsProvider from '@/context/ContextsProvider';
import { ThemeProvider } from '@/context/ThemeProvider';
import Router from '@/Router';
import { GlobalStyle } from '@/style/global';

function App() {
  return (
    <HelmetProvider>
      <div className="app">
        <ThemeProvider>
          <ContextsProvider>
            <BaseMeta />
            <GlobalStyle />
            <Router />
          </ContextsProvider>
        </ThemeProvider>
      </div>
    </HelmetProvider>
  );
}

export default App;
