import { atom } from "recoil";

export const petTypeState = atom({
  key: 'petTypeState',
  default: 'dog',
});