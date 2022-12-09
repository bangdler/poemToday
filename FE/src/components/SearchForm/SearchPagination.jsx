import React from 'react';
import styled from 'styled-components';

import StyleLink from '@/components/common/StyleLink';
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
        <StyleLink key={idx} onClick={() => clickLink(num)} size={'medium'}>
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
`;

const S_Page = styled.p`
  text-decoration: ${({ cur }) => (cur ? 'underline' : '')};
`;
