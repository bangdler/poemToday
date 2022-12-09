import React, { useContext, useEffect, useRef } from 'react';
import styled from 'styled-components';

import { ReactComponent as Search } from '@/assets/icons/search.svg';
import { PoemListDispatchContext, usePoemList } from '@/context/PoemListProvider';

export default function SearchInput({ searchText, setSearchText, setOpenSearchCardContainer, setError }) {
  const { initializePoemList } = useContext(PoemListDispatchContext);
  const { searchPoemListFromServer } = usePoemList();

  const searchInput = useRef();

  const changeSearchInput = ({ target }) => {
    setSearchText(target.value);
  };

  const submitSearchText = e => {
    e.preventDefault();
    if (!searchText.length) {
      setError({ state: true, message: '1글자 이상 입력해주세요!' });
      return;
    }
    initializePoemList();
    searchPoemListFromServer({ text: searchText });
    setOpenSearchCardContainer(true);
  };

  useEffect(() => {
    searchInput.current.focus();
  }, []);

  return (
    <S_FormLayout onSubmit={submitSearchText}>
      <S_SvgContainer>
        <Search width={22} height={22} viewBox="0 0 16 16" />
      </S_SvgContainer>
      <S_Input
        ref={searchInput}
        value={searchText}
        onChange={changeSearchInput}
        placeholder={'제목, 저자를 검색해보세요.'}
      ></S_Input>
    </S_FormLayout>
  );
}

const S_FormLayout = styled.form`
  width: 600px;
  position: relative;
  margin: 0 auto;
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
