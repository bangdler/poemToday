import { css } from 'styled-components';

export const CategoryStyle = css`
  background-color: ${({ color }) => color};
  color: black;
  height: 22px;
  width: 66px;
  border-radius: 4px;
  ${({ theme }) => theme.mixin.flexBox({})}
  padding: 0.3rem 0.4rem;
  font-size: 1.6rem;
  user-select: none;
`;

export const DimLayerStyle = css`
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  ${({ theme }) => theme.mixin.flexBox({})};
`;
