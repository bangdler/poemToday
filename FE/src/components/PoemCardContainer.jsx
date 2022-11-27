import React, { useContext, useEffect } from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import PoemCard from '@/components/PoemCard';
import { PoemListContext, usePoemList } from '@/context/PoemListProvider';
import { GetPoemListServerErrorMessages } from '@/utils/constants';

export default function PoemCardContainer() {
  const { poemList, error } = useContext(PoemListContext);
  const { poemListLoading, getPoemListFromServer } = usePoemList();
  const { username } = useParams();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const page = parseInt(searchParams.get('page'), 10) || 1;
    getPoemListFromServer({ page, username });
  }, []);

  return (
    <>
      <S_Container>
        {poemList.map(poemCard => (
          <PoemCard
            key={poemCard._id}
            id={poemCard._id}
            username={poemCard.user.username}
            title={poemCard.title}
            body={poemCard.body}
            category={poemCard.category}
          />
        ))}
      </S_Container>
      <S_Wrapper>
        {error && <S_Error>{GetPoemListServerErrorMessages[error.response.status]}</S_Error>}
        {poemListLoading && <LoadingSpinner width={'100px'} color={`red`} />}
      </S_Wrapper>
    </>
  );
}

const S_Container = styled.div`
  margin: 40px 20px;
  display: grid;
  column-gap: 20px;
  row-gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, min-content));
  grid-auto-flow: row;
  justify-items: center;
`;

const S_Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})}
`;

const S_Error = styled.p`
  height: 200px;
  font-size: 3rem;
`;
