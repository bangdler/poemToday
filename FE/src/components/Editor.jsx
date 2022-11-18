import React, { useMemo } from 'react';
import ReactQuill from 'react-quill';
import styled from 'styled-components';

import 'react-quill/dist/quill.snow.css';
import CheckBox from '@/components/common/CheckBox';
import { S_Button } from '@/components/commonStyled/styleButtons';
import { S_Category } from '@/components/commonStyled/styleDivs';
import { S_AuthorInput, S_TitleInput } from '@/components/commonStyled/styleInputs';
import palette from '@/style/palette';
import { Categories } from '@/utils/constants';

export default function Editor({ placeholder, value, ...rest }) {
  const toolbarOptions = useMemo(
    () => [
      // ['link', 'image', 'video'],
      [{ font: [] }],
      [{ header: [1, 2, 3, false] }],
      ['bold', 'italic', 'underline', 'strike'],
      ['blockquote', 'code-block'],
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ color: [] }, { background: [] }],
      [{ align: [] }],
      ['clean'],
    ],
    []
  );

  // 옵션에 상응하는 포맷, 추가해주지 않으면 text editor에 적용된 스타일을 볼수 없음
  const formats = [
    'header',
    'font',
    'size',
    'bold',
    'italic',
    'underline',
    'strike',
    'align',
    'blockquote',
    'list',
    'bullet',
    'indent',
    'background',
    'color',
    'link',
    'image',
    'video',
    'width',
  ];

  const modules = {
    toolbar: {
      container: toolbarOptions,
    },
  };

  return (
    <S_Wrapper>
      <S_TitleInput placeholder={'제목을 입력하세요.'} />
      <S_Wrapper2>
        <S_AuthorInput placeholder={'저자를 입력하세요.'} />
        <S_CategoryContainer>
          {Categories.map(({ name, color }, idx) => (
            <CheckBox key={idx} value={name} text={name} color={color} />
          ))}
        </S_CategoryContainer>
      </S_Wrapper2>
      <S_ReactQuill
        {...rest}
        placeholder={placeholder}
        value={value || ''}
        theme="snow"
        modules={modules}
        // formats={formats}
      />
      {Categories.map(({ name, color }, idx) => (
        <S_Category key={idx} color={color}>
          {name}
        </S_Category>
      ))}
      <S_CyanButton size={'medium'}>작성하기</S_CyanButton>
      <S_CyanButton size={'medium'}>취소하기</S_CyanButton>
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  height: 600px;
  > * {
    margin-bottom: 2rem;
  }
`;

const S_Wrapper2 = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-start' })}
  > * {
    margin-right: 2rem;
  }
`;

const S_CategoryContainer = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})}
  > * {
    margin-right: 1rem;
  }
`;

const S_ReactQuill = styled(ReactQuill)`
  .ql-container {
    min-height: 300px;
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
