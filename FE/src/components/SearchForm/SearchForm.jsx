import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';

import ErrorBox from '@/components/common/ErrorBox';
import SearchCardContainer from '@/components/SearchForm/SearchCardContainer';
import SearchInput from '@/components/SearchForm/SearchInput';
import SearchPagination from '@/components/SearchForm/SearchPagination';
import { PoemListContext, PoemListDispatchContext } from '@/context/PoemListProvider';

export default function SearchForm() {
  const { poemList, lastPage } = useContext(PoemListContext);
  const { initializePoemList } = useContext(PoemListDispatchContext);
  const [searchText, setSearchText] = useState('');
  const [error, setError] = useState({ state: false, message: '' });
  const [openSearchCardContainer, setOpenSearchCardContainer] = useState(false);
  const [page, setPage] = useState(1);

  const closeErrorBox = async () => {
    setError({ state: false, message: '' });
  };

  useEffect(() => {
    return () => initializePoemList;
  }, []);

  return (
    <S_Wrapper>
      <SearchInput
        searchText={searchText}
        setSearchText={setSearchText}
        setOpenSearchCardContainer={setOpenSearchCardContainer}
        setError={setError}
      />
      {openSearchCardContainer && <SearchCardContainer />}
      <SearchPagination
        visible={poemList.length}
        searchText={searchText}
        page={page}
        setPage={setPage}
        lastPage={lastPage}
      />
      <ErrorBox visible={error.state} errorMessage={error.message} onClick={closeErrorBox} />
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  margin: 50px 0 20px 0;
`;
