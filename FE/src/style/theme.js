import { css } from 'styled-components';

export const lightTheme = {
  bgColor: '#f8f7f4',
  textColor: '#31302e',
  borderColor: '#eaeaea',
  cardColor: '#fff',
  hoverBgColor: '#dee2e6',
  dimColor: 'rgba(249,249,249,0.85)',
};

export const darkTheme = {
  bgColor: '#1e1e22',
  textColor: '#ccc',
  borderColor: '#2c2d33',
  cardColor: '#333',
  hoverBgColor: '#495057',
  dimColor: 'rgba(0,0,0,0.85)',
};

const device = {
  laptop: `(min-width : 1024px)`,
  tablet: `(max-width : 1024px)`,
};

const mixin = {
  flexBox: ({ direction = 'row', align = 'center', justify = 'center' }) => css`
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
  ellipsis: ({ lineNum, lineHeight }) => css`
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: ${lineNum}; /* 라인수 */
    -webkit-box-orient: vertical;
    word-wrap: break-word;
    line-height: ${lineHeight};
    height: ${lineNum * lineHeight}; /* line-height 가 1.2em 이고 3라인을 자르기 때문에 height는 1.2em * 3 = 3.6em */
  `,
};

export const common = {
  device,
  mixin,
};
