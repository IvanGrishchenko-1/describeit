import { Tabs as MantineTabs } from '@mantine/core';
import {
  IconDeviceGamepad,
  IconDisc,
  IconLego,
  IconMovie,
} from '@tabler/icons-react';
import React from 'react';

import { Tab, TabProps } from './Tab';

type TabsProps = {
  tabs?: TabProps[];
};

const tabsHome: TabProps[] = [
  { value: 'anime', i18nKey: 'tabs:anime', icon: <IconLego /> },
  { value: 'movies', i18nKey: 'tabs:movies', icon: <IconMovie /> },
  { value: 'games', i18nKey: 'tabs:games', icon: <IconDeviceGamepad /> },
  { value: 'music', i18nKey: 'tabs:music', icon: <IconDisc /> },
];

export const Tabs: React.FC<TabsProps> = ({ tabs = tabsHome }) => (
  <MantineTabs.List>
    {tabs.map((props, index) => (
      <Tab key={`tab-${index}`} {...props} />
    ))}
  </MantineTabs.List>
);
