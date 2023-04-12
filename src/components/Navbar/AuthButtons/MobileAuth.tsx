import { ActionIcon, Menu } from '@mantine/core';
import { IconSun } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React from 'react';
import { useSetRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';

export type AuthProps = {
  mobileClasses: string;
};

export const MobileAuth: React.FC<AuthProps> = ({ mobileClasses }) => {
  const setModalState = useSetRecoilState(authModalState);

  return (
    <Menu
      position="bottom-end"
      transitionProps={{ transition: 'rotate-right', duration: 150 }}
    >
      <Menu.Target>
        <ActionIcon
          component={motion.button}
          size="lg"
          className={mobileClasses}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <IconSun size={20} stroke={1.5} />
        </ActionIcon>
      </Menu.Target>

      <Menu.Dropdown>
        <Menu.Item
          onClick={() => setModalState(prev => ({ ...prev, open: true }))}
          icon={<IconSun size={20} />}
        >
          Sign In/Up
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};
