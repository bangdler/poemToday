import React, { useContext, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import PoemDetailActionButtons from '@/components/poemDetailModal/PoemDetailActionButtons';
import PoemDetailContents from '@/components/poemDetailModal/PoemDetailContents';
import { LoadingContext } from '@/context/LoadingProvider';
import { PoemContext, PoemDispatchContext, usePoem } from '@/context/PoemProvider';
import { UserContext } from '@/context/UserProvider';

export default function PoemDetailCard({ closeModal }) {
  const { poemId } = useParams();
  const userData = useContext(UserContext);
  const poemData = useContext(PoemContext);
  const { initializePoem } = useContext(PoemDispatchContext);
  const { getPoemByIdFromServer } = usePoem();
  const loading = useContext(LoadingContext)

  useEffect(() => {
    getPoemByIdFromServer({ id: poemId });
    return () => {
      initializePoem({ field: 'read' });
      initializePoem({ field: 'remove' });
    };
  }, []);

  const owePoem = userData.user && userData.user._id === poemData.read.response?.user._id;

  const curPoemForm = poemData.read.response && {
    title: poemData.read.response.title,
    author: poemData.read.response.author,
    body: poemData.read.response.body,
    category: poemData.read.response.category,
    response: null,
    error: null,
  };

  return (
    <S_CardWrapper onClick={e => e.stopPropagation()}>
      <PoemDetailContents
        getPoemError={poemData.read.error}
        getPoemResponse={poemData.read.response}
        loading={loading.read}
      />
      <PoemDetailActionButtons
        username={userData.user?.username}
        poemId={poemId}
        closeModal={closeModal}
        curPoemForm={curPoemForm}
        ownPoem={owePoem}
        removePoemResponse={poemData.remove.response}
        removePoemError={poemData.remove.error}
      />
    </S_CardWrapper>
  );
}

const S_CardWrapper = styled.div`
  width: 420px;
  height: 580px;
  background-color: ${({ theme }) => theme.mode.cardColor};
  border-radius: 5px;
  padding: 20px 10px;
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })};
`;
