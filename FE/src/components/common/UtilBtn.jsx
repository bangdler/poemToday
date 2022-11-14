import React from 'react';
import styled from 'styled-components';

import BlindText from '@/components/common/BlindText';
import { S_CircleBtn } from '@/components/common/styleButtons';

export default function UtilBtn({ children, blindText, onClick }) {
  return (
    <S_CircleBtn onClick={onClick}>
      <BlindText text={blindText} />
      <S_SvgContainer>{children}</S_SvgContainer>
    </S_CircleBtn>
  );
}

const S_SvgContainer = styled.div`
  > svg {
    fill: ${({ theme }) => theme.mode.textColor};
  }
`;
