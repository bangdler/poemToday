import styled, { css } from 'styled-components';

import palette from '@/style/palette';

export const S_Button = styled.button`
  border-radius: 4px;
  padding: 0.25rem 1rem;
  background-color: ${({ theme }) => theme.mode.bgColor};
  ${({ theme }) => theme.mixin.flexBox({})}
  color:${({ theme }) => theme.mode.textColor};
  &:hover {
    background-color: ${({ theme }) => theme.mode.hoverBgColor};
  }
  ${({ size }) => {
    if (size === 'small') {
      return css`
        height: 24px;
        font-size: 1.2rem;
      `;
    }
    if (size === 'medium') {
      return css`
        height: 46px;
        font-size: 2rem;
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
  box-shadow: 0 2px 2px ${palette.gray[4]};
  :hover {
    background-color: ${({ theme }) => theme.mode.hoverBgColor};
  }
`;

export const S_TextBtn = styled.button`
  font-size: 1.6rem;
  color: ${({ theme }) => theme.mode.textColor};
  border-bottom: 1px solid ${({ theme }) => theme.mode.borderColor};
  &:hover {
    border-color: ${({ theme }) => theme.mode.hoverBgColor};
  }
`;

export const S_CyanButton = styled(S_Button)`
  background-color: ${palette.cyan[5]};
  &:hover:enabled {
    background-color: ${palette.cyan[4]};
  }
  &:disabled {
    cursor: not-allowed;
    opacity: 0.5;
    background-color: ${palette.cyan[5]};
  }
`;