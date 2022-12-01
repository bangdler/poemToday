import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ConfirmModal from '@/components/common/ConfirmModal';
import ErrorBox from '@/components/common/ErrorBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { S_Button, S_CyanButton, S_RedButton } from '@/components/commonStyled/styleButtons';
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
  loading,
}) {
  const { setPoemData } = useContext(PoemDispatchContext);
  const { removePoemByIdFromServer } = usePoem();
  const navigate = useNavigate();
  const [error, setError] = useState({ state: false, message: '' });
  const [removeConfirmModal, setRemoveConformModal] = useState(false);
  const [loginAlertModal, setLoginAlertModal] = useState(false);

  const onEdit = () => {
    setPoemData({ field: 'edit', state: curPoemForm });
    navigate(`/edit/@${username}/${poemId}`);
  };

  const onRemove = () => {
    setRemoveConformModal(true);
  };

  const onClickRemoveConfirm = () => {
    removePoemByIdFromServer({ id: poemId });
  };

  const onClickRemoveCancel = () => {
    setRemoveConformModal(false);
  };

  const onClickGoLoginConfirm = () => {
    navigate('/login');
  };

  const closeErrorBox = async () => {
    setError({ state: false, message: '' });
  };

  useEffect(() => {
    if (removePoemResponse === null) return;
    navigate('/');
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
              <S_CyanButton size={'medium'} disabled={loading} onClick={onEdit}>
                수정
              </S_CyanButton>
              <S_RedButton size={'medium'} disabled={loading} onClick={onRemove}>
                삭제 <LoadingSpinner visible={loading} width={'20px'} color={`blue`} />
              </S_RedButton>
            </>
          )}
        </S_Wrapper2>
        <S_Button size={'medium'} onClick={() => closeModal()}>
          닫기
        </S_Button>
      </S_Wrapper>
      <ErrorBox visible={error.state} errorMessage={error.message} onClick={closeErrorBox} />}
      <ConfirmModal
        visible={removeConfirmModal}
        title={'삭제하시겠습니까?'}
        description={'삭제 후 되돌릴 수 없습니다.'}
        confirmText={'삭제'}
        cancelText={'취소'}
        onConfirm={onClickRemoveConfirm}
        onCancel={onClickRemoveCancel}
      />
      <ConfirmModal
        visible={loginAlertModal}
        title={'로그인이 필요합니다.'}
        description={'로그인 페이지로 이동해주세요!'}
        confirmText={'이동'}
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
