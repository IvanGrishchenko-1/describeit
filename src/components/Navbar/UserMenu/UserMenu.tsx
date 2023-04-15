import {
  Avatar,
  Menu as MantineMenu,
  Switch,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { useToggle } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconLanguage, IconUser } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { useEffect } from 'react';
import { useSignOut } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase/ClientApp';
import { error, success } from '../../Notifications/Notifications';

export const UserMenu: React.FC = () => {
  const theme = useMantineTheme();
  const [signOut] = useSignOut(auth);
  const [value, toggle] = useToggle();
  const { push, pathname, asPath, query } = useRouter();
  const { t } = useTranslation();

  const handleSignOut = (): Promise<void> =>
    signOut()
      .then(() =>
        notifications.show({
          title: 'Success',
          message: 'You logged out',
          ...success,
        }),
      )
      .catch(() =>
        notifications.show({
          title: '...Oops, something went wrong',
          message: 'Try again later',
          ...error,
        }),
      );

  const pushToLocale = async (): Promise<boolean | void> =>
    await push({ pathname, query }, asPath, { locale: value ? 'ru' : 'en' });

  useEffect(() => {
    pushToLocale().catch(error => console.error(error));
  }, [value]);

  return (
    <MantineMenu
      position="bottom-end"
      transitionProps={{ transition: 'rotate-right', duration: 150 }}
      closeOnItemClick={false}
    >
      <MantineMenu.Target>
        <Avatar
          size="md"
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        />
      </MantineMenu.Target>

      <MantineMenu.Dropdown>
        <MantineMenu.Item icon={<IconLanguage size={20} />}>
          <Switch
            labelPosition="left"
            label={t('home:language')}
            onLabel="EN"
            offLabel="RU"
            size="lg"
            onChange={() => toggle()}
            color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
          />
        </MantineMenu.Item>

        <MantineMenu.Divider />

        <MantineMenu.Item
          onClick={handleSignOut}
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
            {t('home:exit')}
          </Text>
        </MantineMenu.Item>
      </MantineMenu.Dropdown>
    </MantineMenu>
  );
};
