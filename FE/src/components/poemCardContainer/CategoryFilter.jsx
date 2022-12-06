import React, { useState } from 'react';
import styled from 'styled-components';

import CheckBox from '@/components/common/CheckBox';
import { S_Button, S_CyanButton } from '@/components/commonStyled/styleButtons';
import { Categories } from '@/utils/constants';

export default React.memo(function CategoryFilter() {
  const [filter, setFilter] = useState(false);
  const [checkedList, setCheckedList] = useState([]);

  const onChange = ({ target }) => {
    if (checkedList.includes(target.id)) {
      const newList = checkedList.filter(it => it !== target.id);
      setCheckedList(newList);
    } else {
      const newList = [...checkedList, target.id];
      setCheckedList(newList);
    }
  };

  return (
    <S_Wrapper>
      <S_CyanButton size={'medium'} onClick={() => setFilter(!filter)}>
        카테고리별
      </S_CyanButton>
      {filter && (
        <S_FilterContainer>
          <S_Wrapper2>
            <S_Description>원하는 카테고리를 골라 적용해보세요!</S_Description>
            <S_Button onClick={() => setFilter(false)}>X</S_Button>
          </S_Wrapper2>
          <S_CategoryContainer>
            {Categories.map((it, idx) => (
              <CheckBox
                key={idx}
                checked={checkedList.includes(it.name)}
                value={it.name}
                color={it.color}
                text={it.name}
                onChange={onChange}
                size={'medium'}
              />
            ))}
          </S_CategoryContainer>
          <S_CyanButton size={'fullWidth'}>적용하기</S_CyanButton>
        </S_FilterContainer>
      )}
    </S_Wrapper>
  );
});

const S_Wrapper = styled.div`
  z-index: 1;
  width: 100%;
  position: relative;
  margin: 40px 20px;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column', align: 'flex-end' })};
`;

const S_FilterContainer = styled.div`
  border: 2px solid ${({ theme }) => theme.mode.textColor};
  border-radius: 5px;
  background: ${({ theme }) => theme.mode.cardColor};
  padding: 1.5rem;
  margin-top: 1rem;
  position: absolute;
  top: 100%;
  right: 0;
  display: block;
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  > *:not(:last-child) {
    margin-bottom: 1.4rem;
  }
`;

const S_Wrapper2 = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ justify: 'space-between' })}
  > *:not(:last-child) {
    margin-right: 1.4rem;
  }
`;
const S_Description = styled.h2`
  font-size: 2rem;
`;
const S_CategoryContainer = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})}
  > *:not(:last-child) {
    margin-right: 1.4rem;
  }
  padding: 1rem;
`;