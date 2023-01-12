import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PoemDetailCard from '@/components/poemDetailModal/PoemDetailCard';
import PoemDetailModal from '@/components/poemDetailModal/PoemDetailModal';

export default function PoemDetail() {
  const [pop, setPop] = useState(true);
  const navigate = useNavigate();

  const closeModal = useCallback(() => {
    setPop(false);
  }, [setPop]);

  useEffect(() => {
    if (!pop) {
      setTimeout(() => {
        navigate(-1);
      }, 500);
    }
  }, [pop]);

  return (
    <>
      <PoemDetailModal pop={pop} closeModal={closeModal}>
        <PoemDetailCard closeModal={closeModal} />
      </PoemDetailModal>
    </>
  );
}
