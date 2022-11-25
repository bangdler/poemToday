import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import LoadingSpinner from '@/components/common/LoadingSpinner';
import { S_Button } from '@/components/commonStyled/styleButtons';
import { PoemContext, usePoem } from '@/context/PoemProvider';
import palette from '@/style/palette';
import { PostPoemServerErrorMessages } from '@/utils/constants';

export default function WriteActionButtons() {
  const { poemLoading, postPoemToServer } = usePoem();
  const poemData = useContext(PoemContext);
  const navigate = useNavigate();
  const [error, setError] = useState({ state: false, message: '' });

  useEffect(() => {
    if (poemData.response === null) return;
    console.log('전송완료');
    console.log(poemData.response);
    //TODO: poem id 로 라우팅
    navigate('/');
  }, [poemData.response]);

  useEffect(() => {
    if (poemData.error === null) return;
    console.log('전송실패');
    console.log(poemData.error);
    const errorStatus = poemData.error.response.status;
    setError({ state: true, message: PostPoemServerErrorMessages[errorStatus] });
  }, [poemData.error]);

  const closeErrorBox = async () => {
    setError({ state: false, message: '' });
  };

  const onSubmit = async e => {
    e.preventDefault();
    await closeErrorBox();
    if ([poemData.title, poemData.body, poemData.author].includes('')) {
      setError({ state: true, message: '제목, 저자, 내용을 모두 입력하세요.' });
      return;
    }
    postPoemToServer();
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
        <S_CyanButton size={'medium'} disabled={poemLoading} onClick={onSubmit}>
          작성하기 {poemLoading && <LoadingSpinner width={'20px'} color={`red`} />}
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

const S_CyanButton = styled(S_Button)`
  background-color: ${palette.cyan[5]};
  &:hover:enabled {
    background-color: ${palette.cyan[4]};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${palette.cyan[5]};
  }
`;
