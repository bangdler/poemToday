import { css } from 'styled-components';

export const CategoryStyle = css`
  background-color: ${({ color }) => color};
  color: black;
  border-radius: 4px;
  ${({ theme }) => theme.mixin.flexBox({})};
  padding: 0.3rem 0.4rem;
  user-select: none;
  ${({ size }) => {
    if (size === 'small') {
      return css`
        height: 22px;
        width: 66px;
        font-size: 1.6rem;
      `;
    }
    if (size === 'medium') {
      return css`
        height: 40px;
        width: 80px;
        font-size: 2rem;
      `;
    }
  }}
`;

export const DimLayerStyle = css`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  ${({ theme }) => theme.mixin.flexBox({})};
`;
