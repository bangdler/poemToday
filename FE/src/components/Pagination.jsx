import qs from 'qs';
import React from 'react';
import styled from 'styled-components';

import StyleLink from '@/components/common/StyleLink';
import { S_Button } from '@/components/commonStyled/styleButtons';
import palette from '@/style/palette';

export default function Pagination({ username, page, lastPage }) {
  const buildUrl = ({ username, page }) => {
    const query = qs.stringify({ page });
    return username ? `/@${username}?${query}` : `/?${query}`;
  };

  return (
    <S_Wrapper>
      <S_CyanButton size="medium" disabled={page === 1} to={page === 1 ? undefined : buildUrl({ username, page: 1 })}>
        {'<<'}
      </S_CyanButton>
      <S_CyanButton
        size="medium"
        disabled={page === 1}
        to={page === 1 ? undefined : buildUrl({ username, page: page - 1 })}
      >
        이전
      </S_CyanButton>
      {Array.from({ length: lastPage }, (_, idx) => idx + 1).map((num, idx) => (
        <StyleLink key={idx} to={buildUrl({ username, page: num })} size={'medium'}>
          <S_Page cur={page === num}>{num}</S_Page>
        </StyleLink>
      ))}
      <S_CyanButton
        size="medium"
        disabled={page === lastPage}
        to={page === lastPage ? undefined : buildUrl({ username, page: page + 1 })}
      >
        다음
      </S_CyanButton>
      <S_CyanButton
        size="medium"
        disabled={page === lastPage}
        to={page === lastPage ? undefined : buildUrl({ username, page: lastPage })}
      >
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

const S_CyanButton = styled(S_Button)`
  background-color: ${palette.cyan[5]};
  &:hover:enabled {
    background-color: ${palette.cyan[4]};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${palette.cyan[5]};
  }
`;

const S_Page = styled.p`
  text-decoration: ${({ cur }) => (cur ? 'underline' : '')};
`;
