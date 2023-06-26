import 'styled-components';
import { ColorProps, FontProps } from '../assets/styles/theme';

declare module 'styled-components' {
  export interface DefaultTheme {
    color: ColorProps;
    font: FontProps;
  }
}
