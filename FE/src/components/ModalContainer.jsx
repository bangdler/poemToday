import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ConfirmModal from '@/components/common/ConfirmModal';
import { GO_LOGIN_ALERT, REMOVE_CONFORM, useModal } from '@/context/ModalProvider';
import { usePoem } from '@/context/PoemProvider';

export default function ModalContainer() {
  const { modalState, initializeModal } = useModal();
  const { removePoemByIdFromServer } = usePoem();
  const navigate = useNavigate();
  const { poemId } = useParams();

  const onClickRemoveConfirm = () => {
    console.log(poemId)
    removePoemByIdFromServer({ id: poemId });
  };

  const onClickRemoveCancel = () => {
    initializeModal();
  };

  const onClickGoLoginConfirm = () => {
    navigate('/login');
  };

  switch (modalState) {
    case null: {
      return null;
    }
    case GO_LOGIN_ALERT: {
      return (
        <ConfirmModal
          visible={true}
          title={'로그인이 필요합니다.'}
          description={'로그인 페이지로 이동해주세요!'}
          confirmText={'이동'}
          onConfirm={onClickGoLoginConfirm}
        />
      );
    }
    case REMOVE_CONFORM: {
      return (
        <ConfirmModal
          visible={true}
          title={'삭제하시겠습니까?'}
          description={'삭제 후 되돌릴 수 없습니다.'}
          confirmText={'삭제'}
          cancelText={'취소'}
          onConfirm={onClickRemoveConfirm}
          onCancel={onClickRemoveCancel}
        />
      );
    }
  }
}
