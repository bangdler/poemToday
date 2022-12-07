import React, { useContext, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import CategoryFilter from '@/components/poemCardContainer/CategoryFilter';
import Pagination from '@/components/poemCardContainer/Pagination';
import PoemCard from '@/components/poemCardContainer/PoemCard';
import { PoemListContext, PoemListDispatchContext, usePoemList } from '@/context/PoemListProvider';
import { GetPoemListServerErrorMessages } from '@/utils/constants';

export default function PoemCardContainer() {
  const { poemList, error, lastPage } = useContext(PoemListContext);
  const { initializePoemListError } = useContext(PoemListDispatchContext);
  const { poemListLoading, getPoemListFromServer } = usePoemList();
  const { username, poemId } = useParams();
  const [searchParams] = useSearchParams();

  const page = parseInt(searchParams.get('page'), 10) || 1;
  const category = searchParams.getAll('category');

  useEffect(() => {
    if (poemId) return;
    getPoemListFromServer({ page, username, category });
    return () => initializePoemListError();
  }, [page, username, category.length]);

  return (
    <S_Wrapper>
      <CategoryFilter username={username} />
      <S_CardContainer>
        {poemList.map(poemCard => (
          <PoemCard
            key={poemCard._id}
            id={poemCard._id}
            title={poemCard.title}
            body={poemCard.body}
            category={poemCard.category}
          />
        ))}
      </S_CardContainer>
      <Pagination visible={poemList.length} username={username} page={page} lastPage={lastPage} category={category} />
      <S_ErrorWrapper visible={!poemList.length}>
        <S_Error visible={error}>{GetPoemListServerErrorMessages[error?.response.status]}</S_Error>
        <LoadingSpinner visible={poemListLoading} width={'100px'} color={`red`} />
      </S_ErrorWrapper>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  margin: 20px 0;
  > * {
    margin-bottom: 20px;
  }
`;

const S_CardContainer = styled.div`
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, min-content));
  grid-auto-flow: row;
  justify-items: center;
`;

const S_ErrorWrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})}
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  height: 200px;
`;

const S_Error = styled.p`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  font-size: 3rem;
`;
