import React from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

export default function PoemCard({ title, body, category, onClick }) {
  return (
    <S_Wrapper onClick={onClick}>
      <S_Title>{title}</S_Title>
      <S_Line />
      <S_CategoryContainer>
        {category.map((it, idx) => (
          <S_CategoryTag key={idx}>#{it}</S_CategoryTag>
        ))}
      </S_CategoryContainer>
      {!!category.length && <S_Line />}
      <S_ReactQuill readOnly={true} value={body} modules={{ toolbar: null }} />
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  width: 260px;
  height: 340px;
  background-color: ${({ theme }) => theme.mode.cardColor};
  box-shadow: 4px 12px 30px 6px rgb(0 0 0 / 9%);
  border-radius: 5px;
  padding: 20px 10px;
  cursor: pointer;
  &:hover {
    transform: translateY(-10px);
  }
`;

const S_Title = styled.h2`
  min-height: 40px;
  font-size: 3.4rem;
  width: 100%;
  text-align: center;
  ${({ theme }) => theme.mixin.flexBox({})};
  ${({ theme }) => theme.mixin.ellipsis({ lineNum: 2, lineHeight: '3.4rem' })};
  user-select: none;
`;

const S_Line = styled.div`
  border: 2px solid ${({ theme }) => theme.mode.borderColor};
  margin: 10px 0;
`;
const S_CategoryContainer = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({})}
  > * {
    margin-right: 6px;
  }
`;

const S_CategoryTag = styled.span`
  font-size: 1.6rem;
`;

const S_ReactQuill = styled(ReactQuill)`
  .ql-editor {
    padding: 0.5rem 1rem;
    height: 250px;
    overflow-y: hidden;
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
