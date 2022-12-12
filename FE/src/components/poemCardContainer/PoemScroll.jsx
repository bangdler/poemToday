import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import CategoryFilter from '@/components/poemCardContainer/CategoryFilter';
import PoemCard from '@/components/poemCardContainer/PoemCard';
import { LoadingContext } from '@/context/LoadingProvider';
import { PoemListContext, PoemListDispatchContext, usePoemList } from '@/context/PoemListProvider';
import { GetPoemListServerErrorMessages } from '@/utils/constants';

export default function PoemScroll() {
  const { poemList, error, lastPage } = useContext(PoemListContext);
  const { initializePoemListError, initializePoemList } = useContext(PoemListDispatchContext);
  const { getPoemListFromServer, addPoemListFromServer } = usePoemList();
  const loading = useContext(LoadingContext);
  const { poemId } = useParams();
  const [isFetching, setFetching] = useState(false);
  const [page, setPage] = useState(1);
  const [isLastPage, setIsLastPage] = useState(false);
  const [searchParams] = useSearchParams();

  const navigate = useNavigate();

  const category = searchParams.getAll('category');

  const clickPoemCard = id => {
    navigate(`/${id}`);
  };
  console.log(page, category, lastPage, isLastPage);

  const addPoemList = () => {
    addPoemListFromServer({ page, category });
    initializePoemListError();
    setFetching(false);
  };

  const handleScroll = () => {
    const { scrollTop, offsetHeight } = document.documentElement;
    if (window.innerHeight + scrollTop >= offsetHeight) {
      console.log('scroll');
      setFetching(true);
    }
  };

  useEffect(() => {
    if (poemList.length === 0) return;
    setPage(page + 1);
    setIsLastPage(page === lastPage);
  }, [poemList.length]);

  useEffect(() => {
    setFetching(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && !isLastPage) addPoemList();
    else if (isLastPage) setFetching(false);
  }, [isFetching]);

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
            onClick={() => clickPoemCard(poemCard._id)}
          />
        ))}
      </S_CardContainer>
      <S_ErrorWrapper visible={loading.list || error}>
        <S_Error visible={error}>{GetPoemListServerErrorMessages[error?.response.status]}</S_Error>
        <LoadingSpinner visible={loading.list} width={'100px'} color={`red`} />
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
