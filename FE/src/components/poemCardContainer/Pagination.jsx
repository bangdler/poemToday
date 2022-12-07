import React from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import StyleLink from '@/components/common/StyleLink';
import { S_CyanButton } from '@/components/commonStyled/styleButtons';
import { buildUrl } from '@/utils/util';

export default function Pagination({ visible, username, page, lastPage, category }) {
  const navigate = useNavigate();

  const clickPrev = () => {
    navigate(buildUrl({ username, page: page - 1, category }));
  };

  const clickNext = () => {
    navigate(buildUrl({ username, page: page + 1, category }));
  };

  const clickStartPage = () => {
    navigate(buildUrl({ username, page: 1, category }));
  };

  const clickLastPage = () => {
    navigate(buildUrl({ username, page: lastPage, category }));
  };

  if (!visible) return null;
  return (
    <S_Wrapper>
      <S_CyanButton size="medium" disabled={page === 1} onClick={clickStartPage}>
        {'<<'}
      </S_CyanButton>
      <S_CyanButton size="medium" disabled={page === 1} onClick={clickPrev}>
        이전
      </S_CyanButton>
      {Array.from({ length: lastPage }, (_, idx) => idx + 1).map((num, idx) => (
        <StyleLink key={idx} to={buildUrl({ username, page: num, category })} size={'medium'}>
          <S_Page cur={page === num}>{num}</S_Page>
        </StyleLink>
      ))}
      <S_CyanButton size="medium" disabled={page === lastPage} onClick={clickNext}>
        다음
      </S_CyanButton>
      <S_CyanButton size="medium" disabled={page === lastPage} onClick={clickLastPage}>
        {'>>'}
      </S_CyanButton>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({})}
  > * {
    margin: 0 1rem;
  }
  margin-bottom: 2rem;
`;

const S_Page = styled.p`
  text-decoration: ${({ cur }) => (cur ? 'underline' : '')};
`;
