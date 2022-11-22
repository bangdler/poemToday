import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import CheckBox from '@/components/common/CheckBox';
import QuillEditor from '@/components/common/QuillEditor';
import { S_AuthorInput, S_TitleInput } from '@/components/commonStyled/styleInputs';
import { AuthContext } from '@/context/AuthProvider';
import { PoemContext, PoemDispatchContext } from '@/context/PoemProvider';

export default function Editor() {
  const authForm = useContext(AuthContext);
  const poemData = useContext(PoemContext);
  const { changePoemData } = useContext(PoemDispatchContext);

  const changeTitle = ({ target }) => {
    changePoemData({ key: 'title', value: target.value });
  };

  const changeAuthor = ({ target }) => {
    changePoemData({ key: 'author', value: target.value });
  };

  const changeCategory = ({ target }) => {
    const category = poemData.category.map(it => {
      if (it.name === target.id) {
        return { ...it, checked: target.checked };
      } else {
        return it;
      }
    });
    changePoemData({ key: 'category', value: category });
  };

  const changeBody = value => {
    changePoemData({ key: 'body', value: value });
  };

  useEffect(() => {
    const selfPoemCategory = poemData.category[0];
    if (selfPoemCategory.checked) {
      changePoemData({ key: 'author', value: authForm.user.username });
    } else {
      changePoemData({ key: 'author', value: '' });
    }
  }, [poemData.category]);

  return (
    <S_Wrapper>
      <S_TitleInput placeholder={'제목을 입력하세요.'} value={poemData.title} onChange={changeTitle} />
      <S_Wrapper2>
        <S_AuthorInput placeholder={'저자를 입력하세요.'} value={poemData.author} onChange={changeAuthor} />
        <S_CategoryContainer>
          {poemData.category.map(({ name, color, checked }, idx) => (
            <CheckBox key={idx} value={name} text={name} color={color} checked={checked} onChange={changeCategory} />
          ))}
        </S_CategoryContainer>
      </S_Wrapper2>
      <QuillEditor value={poemData.body} onChange={changeBody} />
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
