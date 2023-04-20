import { Tabs as MantineTabs } from '@mantine/core';
import React from 'react';

import { homeTabs } from '../../pages';
import { Tab, TabProps } from './Tab';

type TabsProps = {
  tabs?: TabProps[];
};

export const Tabs: React.FC<TabsProps> = ({ tabs = homeTabs }) => (
  <MantineTabs.List>
    {tabs.map((props, index) => (
      <Tab key={`tab-${index}`} {...props} />
    ))}
  </MantineTabs.List>
);
