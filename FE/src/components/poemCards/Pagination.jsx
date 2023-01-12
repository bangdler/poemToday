import React, { useCallback } from 'react';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { S_CyanButton } from '@/components/commonStyled/styleButtons';

export default React.memo(function Pagination({ visible, page, lastPage }) {
  const [, setSearchParams] = useSearchParams();

  const clickPrev = useCallback(() => {
    setSearchParams({ page: String(page - 1) });
  }, [page]);

  const clickNext = useCallback(() => {
    setSearchParams({ page: String(page + 1) });
  }, [page]);

  const clickStartPage = useCallback(() => {
    setSearchParams({ page: '1' });
  }, []);

  const clickLastPage = useCallback(() => {
    setSearchParams({ page: lastPage });
  }, [lastPage]);

  const clickPageButton = num => {
    setSearchParams({ page: String(num) });
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
        <S_PageButton key={idx} cur={page === num} onClick={() => clickPageButton(num)}>
          {num}
        </S_PageButton>
      ))}
      <S_CyanButton size="medium" disabled={page === lastPage} onClick={clickNext}>
        다음
      </S_CyanButton>
      <S_CyanButton size="medium" disabled={page === lastPage} onClick={clickLastPage}>
        {'>>'}
      </S_CyanButton>
    </S_Wrapper>
  );
});

const S_Wrapper = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({})}
  > * {
    margin: 0 1rem;
  }
`;

const S_PageButton = styled.button`
  min-width: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: 1px solid ${({ theme, cur }) => (cur ? theme.mode.textColor : theme.mode.borderColor)};
  &:hover {
    border-color: ${({ theme }) => theme.mode.textColor};
  }
  font-size: 2.4rem;
  font-weight: bold;
`;
