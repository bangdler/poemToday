import React, { useContext } from 'react';
import styled from 'styled-components';

import CheckBox from '@/components/common/CheckBox';
import QuillEditor from '@/components/common/QuillEditor';
import { S_AuthorInput, S_TitleInput } from '@/components/commonStyled/styleInputs';
import { PoemDispatchContext } from '@/context/PoemProvider';

export default function Editor({ field, poemForm, userData }) {
  const { changePoemData } = useContext(PoemDispatchContext);

  const changeTitle = ({ target }) => {
    changePoemData({ field, key: 'title', value: target.value });
  };

  const changeAuthor = ({ target }) => {
    changePoemData({ field, key: 'author', value: target.value });
  };

  const checkSelfPoemCategory = (name, checked) => {
    if (name === '자작시' && checked) {
      changePoemData({ field, key: 'author', value: userData.user.username });
    }
  };

  const changeCategory = ({ target }) => {
    const category = poemForm.category.map(it => {
      if (it.name === target.id) {
        checkSelfPoemCategory(it.name, target.checked);
        return { ...it, checked: target.checked };
      } else {
        return it;
      }
    });
    changePoemData({ field, key: 'category', value: category });
  };

  const changeBody = value => {
    changePoemData({ field, key: 'body', value: value });
  };

  // useEffect(() => {
  //   const selfPoemCategory = poemForm.category[0];
  //   if (selfPoemCategory.checked) {
  //     changePoemData({ field, key: 'author', value: userData.user.username });
  //   } else {
  //     changePoemData({ field, key: 'author', value: poemForm.author });
  //   }
  // }, [poemForm.category[0]]);

  return (
    <S_Wrapper>
      <S_TitleInput placeholder={'제목을 입력하세요.'} value={poemForm.title} onChange={changeTitle} />
      <S_Wrapper2>
        <S_AuthorInput placeholder={'저자를 입력하세요.'} value={poemForm.author} onChange={changeAuthor} />
        <S_CategoryContainer>
          {poemForm.category.map(({ name, color, checked }, idx) => (
            <CheckBox key={idx} value={name} text={name} color={color} checked={checked} onChange={changeCategory} />
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
