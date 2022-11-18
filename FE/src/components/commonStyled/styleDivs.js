import styled from 'styled-components';

export const S_Category = styled.div`
  background-color: ${({ color }) => color};
  color: black;
  height: 22px;
  width: 66px;
  border-radius: 4px;
  ${({ theme }) => theme.mixin.flexBox({})}
  padding: 0.2rem;
  text-align: center;
  font-size: 1.6rem;
  user-select: none;
`;
