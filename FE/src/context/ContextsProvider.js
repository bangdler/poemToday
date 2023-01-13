import React from 'react';

import AuthProvider from '@/context/AuthProvider';
import LoadingProvider from '@/context/LoadingProvider';
import PoemListProvider from '@/context/PoemListProvider';
import PoemProvider from '@/context/PoemProvider';
import UserProvider from '@/context/UserProvider';

export default function ContextsProvider({ children }) {
  return (
    <LoadingProvider>
      <UserProvider>
        <AuthProvider>
          <PoemListProvider>
            <PoemProvider>{children}</PoemProvider>
          </PoemListProvider>
        </AuthProvider>
      </UserProvider>
    </LoadingProvider>
  );
}
