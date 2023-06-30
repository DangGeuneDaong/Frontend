import { atom, atomFamily } from 'recoil';

export interface PostModel {
  nick_name?: string;
  main_category?: string;
  sub_category?: string;
  title?: string;
  description?: string;
  location?: string;
  status?: string;
  good_image_list?: string[];
  viewCnt?: number;
  updatedAt?: Date;
}

export const postState = atom<any>({
  key: 'postState',
  default: null,
});

// export const postState = atomFamily<any, string>({
//   key: 'postState',
//   default: null,
// });

export const postStateLoading = atom<boolean>({
  key: 'postStateLoading',
  default: false,
});
