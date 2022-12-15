import React, { useContext, useEffect } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import CategoryFilter from '@/components/poemCards/CategoryFilter';
import Pagination from '@/components/poemCards/Pagination';
import PoemCard from '@/components/poemCards/PoemCard';
import { LoadingContext } from '@/context/LoadingProvider';
import { PoemListContext, PoemListDispatchContext, usePoemList } from '@/context/PoemListProvider';
import { GetPoemListServerErrorMessages } from '@/utils/constants';

export default function PoemCardContainer() {
  const { poemList, error, lastPage } = useContext(PoemListContext);
  const { initializePoemListError } = useContext(PoemListDispatchContext);
  const { getPoemListFromServer } = usePoemList();
  const loading = useContext(LoadingContext);
  const { username, poemId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const page = parseInt(searchParams.get('page'), 10) || 1;
  const category = searchParams.getAll('category');

  const clickPoemCard = id => {
    const poemDetailUrl = username ? `/@${username}/${id}` : `/${id}`;
    navigate(poemDetailUrl);
  };

  useEffect(() => {
    if (poemId) return; // detail 모달 떴을 때 배경 리스트 요청 안하도록.
    getPoemListFromServer({ page, username, category });
    return () => initializePoemListError();
  }, [page, username]);

  return (
    <S_Wrapper>
      <CategoryFilter username={username} />
      {!error ? (
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
      ) : null}
      <S_ErrorWrapper visible={loading.list || error}>
        <S_Error visible={error}>{GetPoemListServerErrorMessages[error?.response.status]}</S_Error>
        <LoadingSpinner visible={loading.list} width={'100px'} color={`red`} />
      </S_ErrorWrapper>
      <Pagination
        visible={!error && !loading.list}
        username={username}
        page={page}
        lastPage={lastPage}
        category={category}
      />
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
