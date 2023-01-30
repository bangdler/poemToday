import React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { S_Category } from '@/components/commonStyled/styleDivs';
import { CategoryColors, GetPoemByIdServerErrorMessages } from '@/utils/constants';

export default function PoemDetailContents({ getPoemResponse, getPoemError, loading }) {
  const transformDate = responseDate => {
    const koreaDate = new Date(responseDate).toLocaleString();
    return koreaDate.substring(0, koreaDate.length - 3);
  };

  return (
    <S_ContentsWrapper onClick={e => e.stopPropagation()}>
      {getPoemResponse && (
        <>
          <S_Title>{getPoemResponse.title}</S_Title>
          <S_Line />
          <S_Wrapper>
            <S_Author>저자: {getPoemResponse.author}</S_Author>
            <S_Writer>작성자: {getPoemResponse.user.username}</S_Writer>
            <S_Date>작성일시: {transformDate(getPoemResponse.publishedDate)}</S_Date>
            {getPoemResponse.updateDate && <S_Date>수정일시: {transformDate(getPoemResponse.updateDate)}</S_Date>}
            {!!getPoemResponse.category.length && (
              <S_CategoryContainer>
                {getPoemResponse.category.map((it, idx) => (
                  <S_Category key={idx} color={CategoryColors[it]} size={'small'}>
                    {it}
                  </S_Category>
                ))}
              </S_CategoryContainer>
            )}
          </S_Wrapper>
          <S_Line />
          <S_ReactQuill readOnly={true} value={getPoemResponse.body} modules={{ toolbar: null }} />
        </>
      )}
      <S_ErrorWrapper visible={!getPoemResponse}>
        <S_Error visible={getPoemError}>{GetPoemByIdServerErrorMessages[getPoemError?.response.status]}</S_Error>
        <LoadingSpinner visible={loading} width={'100px'} color={`red`} />
      </S_ErrorWrapper>
    </S_ContentsWrapper>
  );
}

const S_ContentsWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
  overflow-y: scroll;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
  margin-bottom: 1rem;
`;

const S_Title = styled.h2`
  min-height: 44px;
  font-size: 4.2rem;
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.mixin.flexBox({})};
`;

const S_Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column', align: 'flex-end' })};
  > *:not(:last-child) {
    margin-bottom: 1rem;
  }
`;
const S_Author = styled.p`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.mode.textColor};
`;

const S_Writer = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
`;

const S_Date = styled.p`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
`;

const S_Line = styled.div`
  border: 2px solid ${({ theme }) => theme.mode.borderColor};
  margin: 10px 0;
`;

const S_CategoryContainer = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})}
  > *:not(:last-child) {
    margin-right: 6px;
  }
`;

const S_ReactQuill = styled(ReactQuill)`
  .ql-editor {
    padding: 0.5rem 1rem;
    > * {
      word-break: keep-all;
      word-wrap: break-word;
    }
  }
  .ql-container {
    border: none;
    font-family: 'Gamja Flower';
    font-size: 1.6rem;
  }
`;

const S_ErrorWrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})}
  display: ${({ visible }) => (visible ? 'flex' : 'none')};
  height: 300px;
`;

const S_Error = styled.p`
  display: ${({ visible }) => (visible ? 'block' : 'none')};
  font-size: 3rem;
`;
