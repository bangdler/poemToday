import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';

import PoemDetailActionButtons from '@/components/PoemDetailActionButtons';
import PoemDetailContents from '@/components/PoemDetailContents';
import { PoemContext, PoemDispatchContext, usePoem } from '@/context/PoemProvider';
import { UserContext } from '@/context/UserProvider';

export default function PoemDetailCard({ closeModal }) {
  const userData = useContext(UserContext);
  const { username, poemId } = useParams();
  const poemData = useContext(PoemContext);
  const { initializePoem } = useContext(PoemDispatchContext);
  const { response, error } = poemData.read;
  const { poemLoading, getPoemByIdFromServer } = usePoem();

  useEffect(() => {
    getPoemByIdFromServer({ id: poemId });
    return () => initializePoem({ field: 'read' });
  }, []);

  const checkOwnPoem = () => {
    if (!userData.user || !response) return false;
    return userData.user._id === response.user._id;
  };

  return (
    <S_CardWrapper onClick={e => e.stopPropagation()}>
      <PoemDetailContents error={error} response={response} loading={poemLoading.read} />
      <PoemDetailActionButtons
        error={error}
        loading={poemLoading.read}
        closeModal={closeModal}
        ownPoem={checkOwnPoem()}
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
