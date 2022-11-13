import React from 'react';
import styled from 'styled-components';

import BlindText from '@/components/common/BlindText';

export default function UtilBtn({ children, blindText, onClick }) {
  return (
    <S_Button onClick={onClick}>
      <BlindText text={blindText} />
      {children}
    </S_Button>
  );
}

const S_Button = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.mode.bgColor};
  box-shadow: 0 5px 10px rgba(40, 40, 40, 1);

  > svg {
    fill: ${({ theme }) => theme.mode.textColor};
  }

  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;
