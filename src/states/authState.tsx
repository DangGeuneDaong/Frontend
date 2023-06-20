import { atom } from 'recoil';

export const accessTokenState = atom<string | null>({
  key: 'accessTokenState', //state명
  default: null, //초기값
});
export const kakaoAccessTokenState = atom<string | null>({
  key: 'kakaoAccessTokenState', //state명
  default: null, //초기값
});
export const naverAccessTokenState = atom<string | null>({
  key: 'naverAccessTokenState',
  default: null,
});
