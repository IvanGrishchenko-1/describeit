import { FileWithPath } from '@mantine/dropzone';
import { atom } from 'recoil';

export const profileImageAtom = atom<FileWithPath[]>({
  key: 'profile-image-atom',
  default: [],
});
