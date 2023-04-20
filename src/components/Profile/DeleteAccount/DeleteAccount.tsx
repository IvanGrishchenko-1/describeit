import { Button, Paper, Stack, Tabs, useMantineTheme } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { IconTrash } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useDeleteUser } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase/ClientApp';
import { error, success } from '../../Notifications/Notifications';

export const DeleteAccount: React.FC = () => {
  const { t } = useTranslation();
  const theme = useMantineTheme();
  const [deleteUser, deleting, deleteError] = useDeleteUser(auth);
  const { push, pathname, query, asPath, locale } = useRouter();

  const handleDelete = async (): Promise<void> => {
    const isDeleted = await deleteUser();
    isDeleted
      ? Promise.resolve(
          push({ pathname, query }, asPath, { locale, shallow: true }),
        ).then(() =>
          notifications.show({
            title: t('notifications:success_delete_account_title'),
            message: t('notifications:success_logout_title'),
            ...success,
          }),
        )
      : notifications.show({
          title: t(`notification:${deleteError?.name}`),
          message: t(`notification:${deleteError?.message}`),
          ...error,
        });
  };

  return (
    <Tabs.Panel value="delete-account">
      <Paper shadow="md" radius="md" p="md" withBorder h={420}>
        <Stack align="center" justify="center" h="100%">
          <Button
            loading={deleting}
            component={motion.button}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            variant="gradient"
            gradient={
              theme.colorScheme === 'dark'
                ? { from: 'orange', to: 'red', deg: 45 }
                : { from: 'indigo', to: 'cyan', deg: 45 }
            }
            leftIcon={<IconTrash />}
            size="xl"
            onClick={handleDelete}
          >
            {t('profile:delete_account')}
          </Button>
        </Stack>
      </Paper>
    </Tabs.Panel>
  );
};
