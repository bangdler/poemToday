import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ConfirmModal from '@/components/common/ConfirmModal';
import ErrorBox from '@/components/common/ErrorBox';
import { S_Button, S_CyanButton, S_RedButton } from '@/components/commonStyled/styleButtons';
import { LoadingContext } from '@/context/LoadingProvider';
import { PoemDispatchContext, usePoem } from '@/context/PoemProvider';
import { DeletePoemByIdServerErrorMessages } from '@/utils/constants';

export default function PoemDetailActionButtons({
  username,
  poemId,
  closeModal,
  ownPoem,
  curPoemForm,
  removePoemResponse,
  removePoemError,
}) {
  const { setPoemData } = useContext(PoemDispatchContext);
  const { removePoemByIdFromServer } = usePoem();
  const loading = useContext(LoadingContext);
  const navigate = useNavigate();
  const [error, setError] = useState({ state: false, message: '' });
  const [removeConfirmModal, setRemoveConformModal] = useState(false);
  const [loginAlertModal, setLoginAlertModal] = useState(false);

  const onEdit = useCallback(() => {
    setPoemData({ field: 'edit', state: curPoemForm });
    navigate(`/edit/@${username}/${poemId}`);
  }, [curPoemForm, username, poemId]);

  const onRemove = useCallback(() => {
    setRemoveConformModal(true);
  }, []);

  const onClickRemoveConfirm = useCallback(() => {
    removePoemByIdFromServer({ id: poemId });
  }, [poemId]);

  const onClickRemoveCancel = useCallback(() => {
    setRemoveConformModal(false);
  }, []);

  const onClickGoLoginConfirm = useCallback(() => {
    navigate('/login');
  }, []);

  const closeErrorBox = useCallback(async () => {
    setError({ state: false, message: '' });
  }, []);

  useEffect(() => {
    if (removePoemResponse === null) return;
    navigate(-1);
  }, [removePoemResponse]);

  useEffect(() => {
    if (removePoemError === null) return;
    const errorStatus = removePoemError.response.status;
    if (errorStatus === '401') {
      setLoginAlertModal(true);
    }
    setError({ state: true, message: DeletePoemByIdServerErrorMessages[errorStatus] });
  }, [removePoemError]);

  return (
    <>
      <S_Wrapper>
        <S_Wrapper2>
          {ownPoem && (
            <>
              <S_CyanButton size={'medium'} onClick={onEdit}>
                ??????
              </S_CyanButton>
              <S_RedButton size={'medium'} onClick={onRemove}>
                ??????
              </S_RedButton>
            </>
          )}
        </S_Wrapper2>
        <S_Button size={'medium'} onClick={closeModal}>
          ??????
        </S_Button>
      </S_Wrapper>
      <ErrorBox visible={error.state} errorMessage={error.message} onClick={closeErrorBox} />
      <ConfirmModal
        visible={removeConfirmModal}
        title={'?????????????????????????'}
        description={'?????? ??? ????????? ??? ????????????.'}
        confirmText={'??????'}
        cancelText={'??????'}
        onConfirm={onClickRemoveConfirm}
        onCancel={onClickRemoveCancel}
        confirmLoading={loading.remove}
      />
      <ConfirmModal
        visible={loginAlertModal}
        title={'???????????? ???????????????.'}
        description={'????????? ???????????? ??????????????????!'}
        confirmText={'??????'}
        onConfirm={onClickGoLoginConfirm}
      />
    </>
  );
}

const S_Wrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({ justify: 'space-between' })};
`;

const S_Wrapper2 = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})};
  > *:not(:last-child) {
    margin-left: 1rem;
    margin-right: 1rem;
  }
`;
