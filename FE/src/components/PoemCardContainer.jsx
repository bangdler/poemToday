import React from 'react';
import styled from 'styled-components';

import PoemCard from '@/components/PoemCard';

export default function PoemCardContainer({ poemList }) {
  return (
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
