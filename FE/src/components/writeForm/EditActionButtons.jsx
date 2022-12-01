import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ConfirmModal from '@/components/common/ConfirmModal';
import ErrorBox from '@/components/common/ErrorBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { S_CyanButton } from '@/components/commonStyled/styleButtons';
import { PoemDispatchContext, usePoem } from '@/context/PoemProvider';
import { UpdatePoemByIdServerErrorMessages } from '@/utils/constants';

export default function EditActionButtons({ field, poemForm, id, username }) {
  const { poemLoading, updatePoemByIdToServer } = usePoem();
  const { initializePoem, initializeError } = useContext(PoemDispatchContext);
  const navigate = useNavigate();
  const [error, setError] = useState({ state: false, message: '' });
  const [loginAlertModal, setLoginAlertModal] = useState(false);

  const onSubmit = async e => {
    e.preventDefault();
    await closeErrorBox();
    if ([poemForm.title, poemForm.body, poemForm.author].includes('')) {
      setError({ state: true, message: '제목, 저자, 내용을 모두 입력하세요.' });
      return;
    }
    updatePoemByIdToServer({ id });
  };

  const onClickCancel = e => {
    e.preventDefault();
    navigate(`/@${username}/${id}`);
  };

  const onClickGoLoginConfirm = () => {
    navigate('/login');
  };

  const closeErrorBox = async () => {
    setError({ state: false, message: '' });
  };

  useEffect(() => {
    if (poemForm.response === null) return;
    console.log('전송완료');
    console.log(poemForm.response);
    navigate(`/@${username}/${id}`);
    return () => initializePoem({ field });
  }, [poemForm.response]);

  useEffect(() => {
    if (poemForm.error === null) return;
    console.log('전송실패');
    console.log(poemForm.error);
    const errorStatus = poemForm.error.response.status;
    if (errorStatus === '401') {
      setLoginAlertModal(true);
    }
    setError({ state: true, message: UpdatePoemByIdServerErrorMessages[errorStatus] });
    return () => initializeError({ field });
  }, [poemForm.error]);

  return (
    <>
      <S_Wrapper>
        <S_CyanButton size={'medium'} onClick={onClickCancel}>
          취소하기
        </S_CyanButton>
        <S_CyanButton size={'medium'} disabled={poemLoading.edit} onClick={onSubmit}>
          수정하기 <LoadingSpinner visible={poemLoading.edit} width={'20px'} color={`red`} />
        </S_CyanButton>
      </S_Wrapper>
      <ErrorBox visible={error.state} errorMessage={error.message} onClick={closeErrorBox} />
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
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-end' })}
  > * {
    margin-left: 2rem;
  }
`;
