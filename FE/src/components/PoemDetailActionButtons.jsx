import React from 'react';
import styled from 'styled-components';

import { S_Button, S_CyanButton, S_RedButton } from '@/components/commonStyled/styleButtons';

export default function PoemDetailActionButtons({ error, loading, closeModal, ownPoem }) {
  return (
    <S_Wrapper>
      <S_Wrapper2>
        {ownPoem && (
          <>
            <S_CyanButton size={'medium'} disabled={error || loading}>
              수정
            </S_CyanButton>
            <S_RedButton size={'medium'} disabled={error || loading}>
              삭제
            </S_RedButton>
          </>
        )}
      </S_Wrapper2>

      <S_Button size={'medium'} onClick={() => closeModal()}>
        닫기
      </S_Button>
    </S_Wrapper>
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
