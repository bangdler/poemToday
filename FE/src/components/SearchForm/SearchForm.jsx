import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { ReactComponent as Search } from '@/assets/icons/search.svg';

export default function SearchForm() {
  const [searchText, setSearchText] = useState('');
  const searchInput = useRef();
  const changeSearchInput = ({ target }) => {
    setSearchText(target.value);
  };

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  return (
    <S_Wrapper>
      <S_FormLayout>
        <S_SvgContainer>
          <Search width={22} height={22} viewBox="0 0 16 16" />
        </S_SvgContainer>
        <S_Input ref={searchInput} value={searchText} onChange={changeSearchInput}></S_Input>
      </S_FormLayout>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })};
  margin: 50px 0;
`;
const S_FormLayout = styled.form`
  width: 600px;
  position: relative;
`;

const S_SvgContainer = styled.div`
  > svg {
    position: absolute;
    top: 32px;
    left: 26px;
  }
`;

const S_Input = styled.input`
  width: 100%;
  padding: 26px 24px 26px 60px;
  color: ${({ theme }) => theme.mode.textColor};
  border-radius: 30px;
  background-color: ${({ theme }) => theme.mode.cardColor};
  border: 2px solid ${({ theme }) => theme.mode.textColor};
  font-size: 2.4rem;
`;
