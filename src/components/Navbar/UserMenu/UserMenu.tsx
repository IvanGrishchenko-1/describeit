import {
  Avatar,
  Menu as MantineMenu,
  Switch,
  Text,
  useMantineTheme,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  IconLanguage,
  IconPlus,
  IconUser,
  IconUserOff,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, useState } from 'react';
import { useAuthState, useSignOut } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { DefaultValue, tabsAtom } from '../../../atoms/tabsAtom';
import { auth } from '../../../firebase/ClientApp';
import { profileTabs } from '../../../pages/profile';
import { error, success } from '../../Notifications/Notifications';

export const UserMenu: React.FC = () => {
  const theme = useMantineTheme();
  const [signOut] = useSignOut(auth);
  const { t } = useTranslation();
  const { push, pathname, asPath, query, locale } = useRouter();
  const [checked, setChecked] = useState(locale === 'ru');
  const setTabs = useSetRecoilState(tabsAtom);
  const [user] = useAuthState(auth);

  const handleSignOut = (): Promise<void> =>
    signOut()
      .then(() =>
        notifications.show({
          title: t('notifications:success_logout_title'),
          message: t('notifications:success_logout_message'),
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

  const handleLanguageChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ): Promise<void> => {
    setChecked(event.currentTarget.checked);
    await push({ pathname, query }, asPath, {
      locale: checked ? 'en' : 'ru',
    });
  };

  const handleMenuClick = (defaultValue: DefaultValue): void => {
    setTabs({ defaultValue: defaultValue, tabs: profileTabs, view: 'profile' });
    push('/profile', `${locale}/profile`, { locale: locale });
  };

  return (
    <MantineMenu
      position="bottom-end"
      transitionProps={{ transition: 'rotate-right', duration: 150 }}
      closeOnItemClick={false}
    >
      <MantineMenu.Target>
        <Avatar
          src={user?.photoURL}
          alt="avatar"
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
            checked={checked}
            label={t('common:language')}
            onLabel="EN"
            offLabel="RU"
            size="lg"
            onChange={handleLanguageChange}
            color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
          />
        </MantineMenu.Item>
        <MantineMenu.Item
          icon={<IconUser size={20} />}
          onClick={() => handleMenuClick('account-settings')}
        >
          <Text size="lg">{t('common:profile')}</Text>
        </MantineMenu.Item>
        <MantineMenu.Item
          icon={<IconPlus size={20} />}
          onClick={() => handleMenuClick('create-post')}
        >
          <Text size="lg">{t('common:add_post')}</Text>
        </MantineMenu.Item>

        <MantineMenu.Divider />

        <MantineMenu.Item
          onClick={handleSignOut}
          closeMenuOnClick
          icon={
            <IconUserOff
              size={20}
              fill={theme.colors.red[5]}
              color={theme.colors.red[5]}
            />
          }
        >
          <Text size="xl" color={theme.colors.red[5]}>
            {t('common:sign_out')}
          </Text>
        </MantineMenu.Item>
      </MantineMenu.Dropdown>
    </MantineMenu>
  );
};
