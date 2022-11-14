import styled, { css } from 'styled-components';

export const S_Button = styled.button`
  border-radius: 4px;
  padding: 0.25rem 1rem;
  color: ${({ theme }) => theme.mode.textColor};
  background-color: ${({ theme }) => theme.mode.bgColor};

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
  ${({ size }) => {
    if (size === 'xs') {
      return css`
        height: 20px;
        font-size: 1rem;
      `;
    }
    if (size === 'small') {
      return css`
        height: 32px;
        font-size: 1.2rem;
        font-weight: bold;
      `;
    }
    if (size === 'fullWidth') {
      return css`
        width: 100%;
        font-size: 2rem;
        font-weight: bold;
        padding-top: 1rem;
        padding-bottom: 1rem;
      `;
    }
  }}
`;

export const S_CircleBtn = styled.button`
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.mode.bgColor};
  box-shadow: 0 5px 10px rgba(40, 40, 40, 1);
  :hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

export const S_TextBtn = styled.button`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: ${({ theme }) => theme.mode.borderColor};
  &:hover {
    border-color: rgba(0, 0, 0, 0.2);
  }
`;
