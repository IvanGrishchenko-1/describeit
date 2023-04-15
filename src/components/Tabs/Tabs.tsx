import { Tabs as MantineTabs, useMantineTheme } from '@mantine/core';
import {
  IconDeviceGamepad,
  IconDisc,
  IconLego,
  IconMovie,
} from '@tabler/icons-react';
import React from 'react';

import { Tab, TabProps } from './Tab';

const tabs: TabProps[] = [
  { value: 'anime', i18nKey: 'home:anime', icon: <IconLego /> },
  { value: 'movies', i18nKey: 'home:movies', icon: <IconMovie /> },
  { value: 'games', i18nKey: 'home:games', icon: <IconDeviceGamepad /> },
  { value: 'music', i18nKey: 'home:music', icon: <IconDisc /> },
];

export const Tabs: React.FC = () => {
  const theme = useMantineTheme();

  return (
    <MantineTabs
      variant="pills"
      defaultValue="anime"
      orientation="vertical"
      color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
    >
      <MantineTabs.List>
        {tabs.map((props, index) => (
          <Tab key={`tab-${index}`} {...props} />
        ))}
      </MantineTabs.List>
    </MantineTabs>
  );
};
