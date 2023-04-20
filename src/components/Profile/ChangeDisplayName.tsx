import { User } from '@firebase/auth';
import { Button, Group, Input, Tooltip, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { IconAlertCircle, IconAlignCenter } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useUpdateProfile } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/ClientApp';
import { error, success } from '../Notifications/Notifications';

type ChangeDisplayNameProps = {
  user?: User | null;
  matchesMiddle: boolean;
};

export const ChangeDisplayName: React.FC<ChangeDisplayNameProps> = ({
  user,
  matchesMiddle,
}) => {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const form = useForm({
    initialValues: { displayName: '' },
    validate: {
      displayName: val => (val.length === 0 ? 'Should not be empty' : null),
    },
  });
  const [updateProfile, updating, updateError] = useUpdateProfile(auth);
  const { push, pathname, query, asPath, locale } = useRouter();

  const handleOnSubmit = async (): Promise<void> => {
    const isUpdated = await updateProfile({
      displayName: form.values.displayName,
    });
    isUpdated
      ? Promise.resolve(
          push({ pathname, query }, asPath, { locale, shallow: true }),
        ).then(() =>
          notifications.show({
            title: t('notifications:success_name_change_title'),
            message: `${t('notifications:success_signup_title')} ${
              user?.displayName
            }`,
            ...success,
          }),
        )
      : notifications.show({
          title: t(`notifications:${updateError?.name}`),
          message: t(`notifications:${updateError?.message}`),
          ...error,
        });
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Group position="apart" spacing="xl">
        <Input
          w={`calc(100% - ${matchesMiddle ? 174 : 324}px)`}
          placeholder={
            user?.displayName
              ? user.displayName
              : t('profile:enter_display_name')
          }
          icon={<IconAlignCenter />}
          variant="filled"
          rightSection={
            <Tooltip
              label={t('profile:change_display_name')}
              position="top-end"
              color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
            >
              <div>
                <IconAlertCircle style={{ display: 'block', opacity: 0.5 }} />
              </div>
            </Tooltip>
          }
          value={form.values.displayName}
          onChange={event =>
            form.setFieldValue('displayName', event.currentTarget.value)
          }
          error={form.errors.displayName && t('common:not_empty')}
        />
        <Button
          type="submit"
          component={motion.button}
          variant="gradient"
          gradient={
            theme.colorScheme === 'dark'
              ? { from: 'orange', to: 'red', deg: 45 }
              : { from: 'indigo', to: 'cyan', deg: 45 }
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          w={matchesMiddle ? 150 : 300}
          loading={updating}
        >
          {t('profile:change_name')}
        </Button>
      </Group>
    </form>
  );
};
