import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import { S_Button } from '@/components/commonStyled/styleButtons';
import { PoemContext, usePoem } from '@/context/PoemProvider';
import palette from '@/style/palette';

export default function WriteActionButtons() {
  const { poemLoading, postPoemToServer } = usePoem();
  const poemData = useContext(PoemContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (poemData.response === null) return;
    console.log('전송완료');
    console.log(poemData.response);
  }, [poemData.response]);

  useEffect(() => {
    if (poemData.error === null) return;
    console.log('전송실패');
    console.log(poemData.error);
  }, [poemData.error]);

  const onSubmit = async e => {
    e.preventDefault();
    if ([poemData.title, poemData.body, poemData.author].includes('')) {
      alert('빈칸을 입력하세요');
      return;
    }
    postPoemToServer();
  };

  return (
    <>
      <S_Wrapper>
        <S_CyanButton size={'medium'} onClick={() => navigate('/')}>
          취소하기
        </S_CyanButton>
        <S_CyanButton size={'medium'} disabled={poemLoading} onClick={onSubmit}>
          작성하기
        </S_CyanButton>
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
