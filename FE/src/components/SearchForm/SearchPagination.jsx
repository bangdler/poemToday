import React from 'react';
import styled from 'styled-components';

import { S_CyanButton } from '@/components/commonStyled/styleButtons';
import { usePoemList } from '@/context/PoemListProvider';

export default function SearchPagination({ visible, searchText, page, setPage, lastPage }) {
  const { searchPoemListFromServer } = usePoemList();

  const clickPrev = () => {
    searchPoemListFromServer({ text: searchText, page: page - 1 });
    setPage(prev => prev - 1);
  };

  const clickNext = () => {
    searchPoemListFromServer({ text: searchText, page: page + 1 });
    setPage(prev => prev + 1);
  };

  const clickStartPage = () => {
    searchPoemListFromServer({ text: searchText, page: 1 });
    setPage(1);
  };

  const clickLastPage = () => {
    searchPoemListFromServer({ text: searchText, page: lastPage });
    setPage(lastPage);
  };

  const clickLink = num => {
    searchPoemListFromServer({ text: searchText, page: num });
    setPage(num);
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
        <S_PageButton key={idx} onClick={() => clickLink(num)} cur={page === num}>
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
}

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
