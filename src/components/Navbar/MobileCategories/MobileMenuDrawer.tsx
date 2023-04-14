import { Drawer, Group } from '@mantine/core';
import React from 'react';
import { useRecoilState } from 'recoil';

import { mobileMenuState } from '../../../atoms/mobileMenuAtom';
import { Tabs } from '../../Tabs/Tabs';

export const MobileMenuDrawer: React.FC = () => {
  const [openMenu, setOpenMenu] = useRecoilState(mobileMenuState);

  return (
    <Drawer
      opened={openMenu}
      onClose={() => setOpenMenu(false)}
      overlayProps={{ opacity: 0.5, blur: 4 }}
      size="xs"
      transitionProps={{ transition: 'rotate-right', duration: 150 }}
    >
      <Group w="100%" py="xl" px="md">
        <Tabs />
      </Group>
    </Drawer>
  );
};
