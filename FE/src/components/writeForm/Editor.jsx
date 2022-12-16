import React, { useCallback, useContext } from 'react';
import styled from 'styled-components';

import CheckBox from '@/components/common/CheckBox';
import QuillEditor from '@/components/common/QuillEditor';
import { S_AuthorInput, S_TitleInput } from '@/components/commonStyled/styleInputs';
import { PoemDispatchContext } from '@/context/PoemProvider';
import { CategoryColors } from '@/utils/constants';

export default function Editor({ field, poemForm, userData }) {
  const { changePoemData } = useContext(PoemDispatchContext);

  const changeTitle = useCallback(
    ({ target }) => {
      changePoemData({ field, key: 'title', value: target.value });
    },
    [changePoemData, field]
  );

  const changeAuthor = useCallback(
    ({ target }) => {
      changePoemData({ field, key: 'author', value: target.value });
    },
    [changePoemData, field]
  );

  const checkSelfPoemCategory = useCallback(
    name => {
      if (name === '자작시') {
        changePoemData({ field, key: 'author', value: userData.user.username });
      }
    },
    [changePoemData, field, userData]
  );

  const changeCategory = useCallback(
    ({ target }) => {
      let newCategory;
      if (target.checked) {
        checkSelfPoemCategory(target.id);
        newCategory = [...poemForm.category, target.id];
      } else {
        newCategory = poemForm.category.filter(it => it !== target.id);
      }
      changePoemData({ field, key: 'category', value: newCategory });
    },
    [changePoemData, checkSelfPoemCategory, field, poemForm.category]
  );

  const changeBody = useCallback(
    value => {
      changePoemData({ field, key: 'body', value: value });
    },
    [changePoemData, field]
  );

  return (
    <S_Wrapper>
      <S_TitleInput placeholder={'제목을 입력하세요.'} value={poemForm.title} onChange={changeTitle} />
      <S_Wrapper2>
        <S_AuthorInput placeholder={'저자를 입력하세요.'} value={poemForm.author} onChange={changeAuthor} />
        <S_CategoryContainer>
          {Object.entries(CategoryColors).map(([name, color], idx) => (
            <CheckBox
              key={idx}
              value={name}
              text={name}
              color={color}
              checked={poemForm.category.includes(name)}
              onChange={changeCategory}
            />
          ))}
        </S_CategoryContainer>
      </S_Wrapper2>
      <QuillEditor value={poemForm.body} onChange={changeBody} />
    </S_Wrapper>
  );
}

const S_Wrapper = styled.div`
  > * {
    margin-bottom: 2rem;
  }
`;

const S_Wrapper2 = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ justify: 'flex-start' })}
  > *:not(:last-child) {
    margin-right: 2rem;
  }
`;

const S_CategoryContainer = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})}
  > *:not(:last-child) {
    margin-right: 1rem;
  }
`;
