import { atom } from 'recoil';

import { TabProps } from '../components/Tabs/Tab';

export type DefaultValue =
  | ''
  | 'anime'
  | 'movies'
  | 'games'
  | 'music'
  | 'account-settings'
  | 'your-posts'
  | 'liked-posts'
  | 'create-post'
  | 'delete-account';

export type TabsState = {
  defaultValue: DefaultValue;
  tabs: TabProps[];
  view: 'home' | 'profile';
};

const defaultTabsState: TabsState = {
  defaultValue: '',
  tabs: [],
  view: 'home',
};

export const tabsAtom = atom<TabsState>({
  key: 'tabs',
  default: defaultTabsState,
});
