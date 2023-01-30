import React, { useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ConfirmModal from '@/components/common/ConfirmModal';
import ErrorBox from '@/components/common/ErrorBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { S_CyanButton } from '@/components/commonStyled/styleButtons';
import { LoadingContext } from '@/context/LoadingProvider';
import { PoemListDispatchContext } from '@/context/PoemListProvider';
import { PoemDispatchContext, usePoem } from '@/context/PoemProvider';
import { UpdatePoemByIdServerErrorMessages } from '@/utils/constants';

export default function EditActionButtons({ field, poemForm, id }) {
  const { updatePoemByIdToServer } = usePoem();
  const { initializePoem, initializeError } = useContext(PoemDispatchContext);
  const { updatePoemFromList } = useContext(PoemListDispatchContext);
  const loading = useContext(LoadingContext);
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
    updatePoemByIdToServer({
      id,
      title: poemForm.title,
      author: poemForm.author,
      body: poemForm.body,
      category: poemForm.category,
    });
  };

  const onClickCancel = useCallback(e => {
    e.preventDefault();
    navigate(-1);
  }, []);

  const onClickGoLoginConfirm = useCallback(() => {
    navigate('/login');
  }, []);

  const closeErrorBox = useCallback(async () => {
    setError({ state: false, message: '' });
  }, []);

  useEffect(() => {
    if (poemForm.response === null) return;
    updatePoemFromList({ id, poem: poemForm.response });
    navigate(-1);
    return () => initializePoem({ field });
  }, [poemForm.response]);

  useEffect(() => {
    if (poemForm.error === null) return;
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
        <S_CyanButton size={'medium'} disabled={loading.edit} onClick={onSubmit}>
          수정하기 <LoadingSpinner visible={loading.edit} width={'20px'} color={`red`} />
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
