import React from 'react';
import styled from 'styled-components';

import Editor from '@/components/Editor';
import Header from '@/components/Header';

export default function Write() {
  return (
    <>
      <Header />
      <PageLayout>
        <Editor />
      </PageLayout>
    </>
  );
}

const PageLayout = styled.div`
  padding: 1rem;
`;
