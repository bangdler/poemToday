import styled from 'styled-components';

export const S_TitleInput = styled.input`
  height: 60px;
  width: 50%;
  font-size: 2.4rem;
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: ${({ theme }) => theme.mode.borderColor};
`;

export const S_AuthorInput = styled.input`
  height: 22px;
  width: 30%;
  font-size: 2rem;
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: ${({ theme }) => theme.mode.borderColor};
`;
