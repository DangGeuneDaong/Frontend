import { atom } from 'recoil';

export const userInfoState = atom<any>({
  key: 'userInfoState',
  default: {},
});

export const userState = atom<any>({
  key: 'userState',
  default: {},
});
