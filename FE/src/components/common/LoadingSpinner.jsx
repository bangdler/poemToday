import React from 'react';
import styled from 'styled-components';

import BlindText from '@/components/common/BlindText';

export default function LoadingSpinner({ width = '50px', color }) {
  return (
    <S_Spinner w={width} c={color}>
      <BlindText text={'로딩중'} />
    </S_Spinner>
  );
}

const S_Spinner = styled.div`
  width: ${({ w }) => w};
  aspect-ratio: 1;
  border-radius: 50%;
  background: ${({ c }) => `conic-gradient(#0000, ${c})`};
  mask: radial-gradient(farthest-side, #0000 65%, #000 0), repeating-conic-gradient(#000 0 45deg, #0000 45deg 72deg);
  -webkit-mask-composite: destination-in;
  mask-composite: intersect;
  animation: spinner .8s infinite steps(5);
  @keyframes spinner {
    from {transform: rotate(0deg); }
    to {transform: rotate(360deg);}
`;
