import { DefaultTheme } from 'styled-components';

const color = {
  primary: '#F8BF52',
  lightPrimary: '#FFD15F',

  red: '#F85A40',
  gray: '#E5E5E5',
  lightGray: '#D9D9D9',
};

const font = {
  // sm, md, lg, xl
  heading_xl: `
      font-weight: 600;
      font-size: 30px;
    `,
  heading_lg: `
      font-weight: 600;
      font-size: 25px;
    `,
  heading_md: `
      font-weight: 600;
      font-size: 20px;
    `,
  heading_sm: `
      font-weight: 600;
      font-size: 18px;
  `,
  contents: `
      font-weight: 400;
      font-size: 14px;
    `,
  hashtag: `
      font-weight: 300;
      font-size: 14px;
    `,
  button: `
      font-weight: 600;
      font-size: 14px;`,
};

export type ColorProps = typeof color;
export type FontProps = typeof font;

export const theme: DefaultTheme = {
  color,
  font,
};
