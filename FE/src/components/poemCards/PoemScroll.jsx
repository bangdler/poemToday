import React, { useCallback, useContext, useEffect, useRef, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import CategoryFilter from '@/components/poemCards/CategoryFilter';
import PoemCard from '@/components/poemCards/PoemCard';
import { LoadingContext } from '@/context/LoadingProvider';
import { PoemListContext, PoemListDispatchContext, usePoemList } from '@/context/PoemListProvider';
import { useInfiniteScrollByIntersection } from '@/hooks/useInfiniteScroll';
import { GetPoemListServerErrorMessages } from '@/utils/constants';

export default function PoemScroll() {
  const { poemList, error, lastPage } = useContext(PoemListContext);
  const { initializePoemList, initializePoemListError } = useContext(PoemListDispatchContext);
  const { addPoemListFromServer } = usePoemList();
  const loading = useContext(LoadingContext);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchParams] = useSearchParams();
  const target = useRef();

  const addPoemList = () => {
    if (!isLastPage) {
      initializePoemListError();
      addPoemListFromServer({ page, category });
      setPage(page + 1);
      setIsLastPage(page === lastPage);
    }
    setIsFetching(false);
  };

  const [, setIsFetching] = useInfiniteScrollByIntersection({ fetchCallback: addPoemList, target: target.current });

  const navigate = useNavigate();

  const category = searchParams.getAll('category');

  const clickPoemCard = useCallback(id => {
    navigate(`/${id}`);
  }, []);

  useEffect(() => {
    initializePoemList();
    return () => initializePoemList();
  }, []);

  return (
    <S_Wrapper>
      <CategoryFilter setPage={setPage} />
      <S_CardContainer>
        {poemList.map(poemCard => (
          <PoemCard
            key={poemCard._id}
            id={poemCard._id}
            title={poemCard.title}
            body={poemCard.body}
            category={poemCard.category}
            onClick={clickPoemCard}
          />
        ))}
      </S_CardContainer>
      <S_ErrorWrapper visible={loading.list || error}>
        <S_Error visible={error}>{GetPoemListServerErrorMessages[error?.response.status]}</S_Error>
        <LoadingSpinner visible={loading.list} width={'100px'} color={`red`} />
      </S_ErrorWrapper>
      <S_Target ref={target} />
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
  justify-content: center;
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

const S_Target = styled.div`
  height: 1px;
`;
