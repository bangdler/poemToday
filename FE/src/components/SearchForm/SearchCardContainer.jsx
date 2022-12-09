import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import PoemCard from '@/components/poemCardContainer/PoemCard';
import { LoadingContext } from '@/context/LoadingProvider';
import { PoemListContext } from '@/context/PoemListProvider';
import Palette from '@/style/palette';
import { GetPoemListServerErrorMessages } from '@/utils/constants';

export default function SearchCardContainer() {
  const { poemList, error, total } = useContext(PoemListContext);
  const loading = useContext(LoadingContext);
  const navigate = useNavigate();

  const clickPoemCard = id => {
    navigate(`/search/${id}`);
  };

  return (
    <S_Wrapper>
      {total ? (
        <S_ResultText>
          검색 결과가 총 <S_ResultNum>{total}</S_ResultNum> 건입니다.
        </S_ResultText>
      ) : loading.list ? null : (
        <S_ResultText>검색 결과가 없습니다.</S_ResultText>
      )}
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
      <S_ErrorWrapper visible={error || loading.list}>
        <S_Error visible={error}>{GetPoemListServerErrorMessages[error?.response.status]}</S_Error>
        <LoadingSpinner visible={loading.list} width={'100px'} color={`red`} />
      </S_ErrorWrapper>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  margin: 20px 0;
  > * {
    margin-bottom: 26px;
  }
`;

const S_ResultText = styled.p`
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-start' })}
  font-size: 4rem;
`;

const S_ResultNum = styled.span`
  font-weight: bold;
  color: ${Palette.cyan[5]};
  margin: 0 1rem;
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
