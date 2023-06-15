import { atom } from 'recoil';

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState', //state명
  default: null, //초기값
});
