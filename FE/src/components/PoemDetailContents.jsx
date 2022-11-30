import React  from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

import LoadingSpinner from '@/components/common/LoadingSpinner';
import { S_Category } from '@/components/commonStyled/styleDivs';
import { GetPoemByIdServerErrorMessages } from '@/utils/constants';

export default function PoemDetailContents({ getPoemResponse, getPoemError, loading }) {
  const getPublishedDate = responseDate => {
    const [date, time] = responseDate.split('T');
    const timeFormat = time.split(':').slice(0, 2).join(':');
    return `${date} ${timeFormat}`;
  };

  return (
    <S_ContentsWrapper onClick={e => e.stopPropagation()}>
      {getPoemResponse && (
        <>
          <S_Title>{getPoemResponse.title}</S_Title>
          <S_Line />
          <S_Wrapper>
            <S_Author>저자: {getPoemResponse.author}</S_Author>
            <S_Date>작성일시: {getPublishedDate(getPoemResponse.publishedDate)}</S_Date>
            <S_CategoryContainer>
              {getPoemResponse.category.map((it, idx) => {
                if (it.checked) {
                  return (
                    <S_Category key={idx} color={it.color}>
                      {it.name}
                    </S_Category>
                  );
                }
              })}
            </S_CategoryContainer>
          </S_Wrapper>
          <S_Line />
          <S_ReactQuill readOnly={true} value={getPoemResponse.body} modules={{ toolbar: null }} />
        </>
      )}
      {(getPoemError || loading) && (
        <S_ErrorWrapper>
          {getPoemError && <S_Error>{GetPoemByIdServerErrorMessages[getPoemError.response.status]}</S_Error>}
          {loading && <LoadingSpinner width={'100px'} color={`red`} />}
        </S_ErrorWrapper>
      )}
    </S_ContentsWrapper>
  );
}

const S_ContentsWrapper = styled.div`
  flex-grow: 1;
  width: 100%;
`;

const S_Title = styled.h2`
  min-height: 44px;
  font-size: 4.2rem;
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.mixin.flexBox({})};
  ${({ theme }) => theme.mixin.ellipsis({ lineNum: 2, lineHeight: '4.2rem' })};
`;

const S_Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column', align: 'flex-end' })};
  > * {
    margin-bottom: 1rem;
  }
`;
const S_Author = styled.p`
  font-size: 2.2rem;
  color: ${({ theme }) => theme.mode.textColor};
`;

const S_Date = styled.p`
  font-size: 1.8rem;
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
    overflow-y: scroll;
    -ms-overflow-style: none;
    &::-webkit-scrollbar {
      display: none;
    }
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
  height: 200px;
`;

const S_Error = styled.p`
  font-size: 3rem;
`;
