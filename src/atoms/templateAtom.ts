import { atom } from 'recoil';

export const templateAtom = atom<string | null>({
  key: 'template-atom',
  default: null,
});
