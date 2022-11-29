import React, { useContext, useEffect } from 'react';
import styled from 'styled-components';

import CheckBox from '@/components/common/CheckBox';
import QuillEditor from '@/components/common/QuillEditor';
import { S_AuthorInput, S_TitleInput } from '@/components/commonStyled/styleInputs';
import { PoemContext, PoemDispatchContext } from '@/context/PoemProvider';
import { UserContext } from '@/context/UserProvider';

export default function Editor() {
  const userData = useContext(UserContext);
  const poemData = useContext(PoemContext);
  const poemWrite = poemData.write;
  const { changePoemData } = useContext(PoemDispatchContext);

  const changeTitle = ({ target }) => {
    changePoemData({ field: 'write', key: 'title', value: target.value });
  };

  const changeAuthor = ({ target }) => {
    changePoemData({ field: 'write', key: 'author', value: target.value });
  };

  const changeCategory = ({ target }) => {
    const category = poemWrite.category.map(it => {
      if (it.name === target.id) {
        return { ...it, checked: target.checked };
      } else {
        return it;
      }
    });
    changePoemData({ field: 'write', key: 'category', value: category });
  };

  const changeBody = value => {
    changePoemData({ field: 'write', key: 'body', value: value });
  };

  useEffect(() => {
    const selfPoemCategory = poemWrite.category[0];
    if (selfPoemCategory.checked) {
      changePoemData({ field: 'write', key: 'author', value: userData.user.username });
    } else {
      changePoemData({ field: 'write', key: 'author', value: '' });
    }
  }, [poemWrite.category[0]]);

  return (
    <S_Wrapper>
      <S_TitleInput placeholder={'제목을 입력하세요.'} value={poemWrite.title} onChange={changeTitle} />
      <S_Wrapper2>
        <S_AuthorInput placeholder={'저자를 입력하세요.'} value={poemWrite.author} onChange={changeAuthor} />
        <S_CategoryContainer>
          {poemWrite.category.map(({ name, color, checked }, idx) => (
            <CheckBox key={idx} value={name} text={name} color={color} checked={checked} onChange={changeCategory} />
          ))}
        </S_CategoryContainer>
      </S_Wrapper2>
      <QuillEditor value={poemWrite.body} onChange={changeBody} />
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
