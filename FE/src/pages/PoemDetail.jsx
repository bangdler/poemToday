import React, { useContext, useEffect } from 'react';

import PoemDetailModal from '@/components/PoemDetailModal';
import Home from '@/pages/Home';

export default function PoemViewer() {
  return (
    <>
      <Home />
      <PoemDetailModal />
    </>
  );
}
