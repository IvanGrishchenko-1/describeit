import { atom } from 'recoil';

export type ProfileTabState = {
  value:
    | 'account-settings'
    | 'your-posts'
    | 'liked-posts'
    | 'create-post'
    | 'delete-account';
};

const defaultProfileTabState: ProfileTabState = { value: 'account-settings' };

export const profileTabAtom = atom<ProfileTabState>({
  key: 'profile-tab-atom',
  default: defaultProfileTabState,
});
