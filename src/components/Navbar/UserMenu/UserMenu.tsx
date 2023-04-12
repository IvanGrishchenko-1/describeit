import {
  Avatar,
  Menu as MantineMenu,
  Switch,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { IconLanguage, IconUser } from '@tabler/icons-react';
import React from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase/ClientApp';

export const UserMenu: React.FC = () => {
  const theme = useMantineTheme();
  const [signOut] = useSignOut(auth);

  return (
    <MantineMenu
      position="bottom-end"
      transitionProps={{ transition: 'rotate-right', duration: 150 }}
      closeOnItemClick={false}
    >
      <MantineMenu.Target>
        <Avatar size="md" />
      </MantineMenu.Target>

      <MantineMenu.Dropdown>
        <MantineMenu.Item icon={<IconLanguage size={20} />}>
          <Switch
            labelPosition="left"
            label="Language"
            onLabel="EN"
            offLabel="RU"
            size="lg"
            color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
          />
        </MantineMenu.Item>

        <MantineMenu.Divider />

        <MantineMenu.Item
          onClick={() => signOut()}
          closeMenuOnClick
          icon={
            <IconUser
              size={20}
              fill={theme.colors.red[5]}
              color={theme.colors.red[5]}
            />
          }
        >
          <Text size="xl" color={theme.colors.red[5]}>
            Sign Out
          </Text>
        </MantineMenu.Item>
      </MantineMenu.Dropdown>
    </MantineMenu>
  );
};
