import { atom } from 'recoil';

export const mobileMenuState = atom<boolean>({
  key: 'mobileMenuState',
  default: false,
});
