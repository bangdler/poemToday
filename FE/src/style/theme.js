export const lightTheme = {
  bgColor: '#f8f7f4',
  textColor: '#31302e',
  borderColor: '1px solid #eaeaea',
};

export const darkTheme = {
  bgColor: '#1e1e22',
  textColor: '#ccc',
  borderColor: '1px solid #2c2d33',
};

const device = {
  laptop: `(min-width : 1024px)`,
  tablet: `(max-width : 1024px)`,
};

const mixin = {
  flexBox: ({ direction = 'row', align = 'center', justify = 'center' }) => `
    display: flex;
    flex-direction: ${direction};
    align-items: ${align};
    justify-content: ${justify};
  `,
};

export const common = {
  device,
  mixin,
};
