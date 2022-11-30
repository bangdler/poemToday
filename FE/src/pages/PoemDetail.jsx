import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import PoemDetailCard from '@/components/PoemDetailCard';
import PoemDetailModal from '@/components/PoemDetailModal';
import Home from '@/pages/Home';

export default function PoemDetail() {
  const [pop, setPop] = useState(true);
  const navigate = useNavigate();

  const closeModal = () => {
    setPop(false);
  };

  useEffect(() => {
    if (!pop) {
      setTimeout(() => {
        navigate('/');
      }, 500);
    }
  }, [pop]);

  return (
    <>
      <Home />
      <PoemDetailModal pop={pop} closeModal={closeModal}>
        <PoemDetailCard closeModal={closeModal} />
      </PoemDetailModal>
    </>
  );
}
