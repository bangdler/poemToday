import React from 'react';
import styled from 'styled-components';

import BlindText from '@/components/common/BlindText';
import { S_CircleBtn } from '@/components/commonStyled/styleButtons';

export default React.memo(function UtilBtn({ children, blindText, onClick }) {
  return (
    <S_CircleBtn onClick={onClick}>
      <BlindText text={blindText} />
      <S_SvgContainer>{children}</S_SvgContainer>
    </S_CircleBtn>
  );
});

const S_SvgContainer = styled.div`
  ${({ theme }) => theme.mixin.flexBox({})}

  > svg {
    fill: ${({ theme }) => theme.mode.textColor};
  }
`;
