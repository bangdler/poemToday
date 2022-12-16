import React from 'react';
import styled from 'styled-components';

import palette from '@/style/palette';

export default React.memo(function InputBox({
  title,
  onChange,
  name,
  value,
  type = 'text',
  autoComplete = 'off',
  option = { component: null, onClick: null },
}) {
  return (
    <S_Wrapper>
      <S_Title>{title}</S_Title>
      <S_Container>
        <S_Input type={type} onChange={onChange} name={name} value={value} autoComplete={autoComplete} />
        {option.component && (
          <S_OptionBtn type="button" onClick={option.onClick}>
            {option.component}
          </S_OptionBtn>
        )}
      </S_Container>
    </S_Wrapper>
  );
});

const S_Wrapper = styled.div`
  ${({ theme }) => theme.mixin.flexBox({ direction: 'column' })}
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.mode.borderColor};
  &:focus-within {
    border-bottom: 1px solid ${palette.gray[7]};
  }
`;

const S_Title = styled.h2`
  width: 100%;
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
  margin-bottom: 1rem;
`;

const S_Container = styled.div`
  width: 100%;
  ${({ theme }) => theme.mixin.flexBox({})}
`;

const S_OptionBtn = styled.button`
  > svg {
    fill: ${({ theme }) => theme.mode.textColor};
  }
`;

const S_Input = styled.input`
  width: 100%;
  font-size: 2rem;
  color: ${({ theme }) => theme.mode.textColor};
`;
