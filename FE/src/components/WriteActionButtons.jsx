import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { S_CyanButton } from '@/components/commonStyled/styleButtons';
import { PoemDispatchContext, usePoem } from '@/context/PoemProvider';
import { PostPoemServerErrorMessages } from '@/utils/constants';

export default function WriteActionButtons({ field, poemForm }) {
  const { poemLoading, writePoemToServer } = usePoem();
  const { initializePoem, initializeError } = useContext(PoemDispatchContext);
  const navigate = useNavigate();
  const [error, setError] = useState({ state: false, message: '' });

  useEffect(() => {
    if (poemForm.response === null) return;
    const response = poemForm.response;
    console.log('전송완료');
    console.log(poemForm.response);
    navigate(`/@${response.user.username}/${response._id}`);

    return () => initializePoem({ field });
  }, [poemForm.response]);

  useEffect(() => {
    if (poemForm.error === null) return;
    console.log('전송실패');
    console.log(poemForm.error);
    const errorStatus = poemForm.error.response.status;
    if (errorStatus === '401') {
      alert('로그인이 필요합니다.');
      navigate('/login');
    }
    setError({ state: true, message: PostPoemServerErrorMessages[errorStatus] });
    return () => initializeError({ field });
  }, [poemForm.error]);

  const closeErrorBox = async () => {
    setError({ state: false, message: '' });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await closeErrorBox();
    if ([poemForm.title, poemForm.body, poemForm.author].includes('')) {
      setError({ state: true, message: '제목, 저자, 내용을 모두 입력하세요.' });
      return;
    }
    writePoemToServer();
  };

  const onClickCancel = e => {
    e.preventDefault();
    navigate(-1);
  };

  return (
    <>
      <S_Wrapper>
        <S_CyanButton size={'medium'} onClick={onClickCancel}>
          취소하기
        </S_CyanButton>
        <S_CyanButton size={'medium'} disabled={poemLoading.write} onClick={onSubmit}>
          작성하기 {poemLoading.write && <LoadingSpinner width={'20px'} color={`red`} />}
        </S_CyanButton>
        {error.state && <ErrorBox errorMessage={error.message} onClick={closeErrorBox} />}
      </S_Wrapper>
    </>
  );
}

const S_Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-end' })}
  > * {
    margin-left: 2rem;
  }
`;
