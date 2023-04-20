import { Button, Group, PasswordInput, useMantineTheme } from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useUpdatePassword } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase/ClientApp';
import { error, success } from '../../Notifications/Notifications';

type ChangePasswordProps = {
  matchesMiddle: boolean;
};

export const ChangePassword: React.FC<ChangePasswordProps> = ({
  matchesMiddle,
}) => {
  const theme = useMantineTheme();
  const { t } = useTranslation();
  const form = useForm({
    initialValues: { newPassword: '' },
    validate: {
      newPassword: val =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });
  const [updatePassword, updating, updateError] = useUpdatePassword(auth);

  const handleUpdatePassword = async (): Promise<void> => {
    const isUpdated = await updatePassword(form.values.newPassword);
    isUpdated
      ? notifications.show({
          title: t('notifications:success_change_password_title'),
          message: t('notifications:success_change_password_message'),
          ...success,
        })
      : notifications.show({
          title: t(`notifications:${updateError?.name}`),
          message: t(`notifications:${updateError?.message}`),
          ...error,
        });
  };

  return (
    <form onSubmit={form.onSubmit(handleUpdatePassword)}>
      <Group position="apart" spacing="xl" h={100}>
        <PasswordInput
          w={`calc(100% - ${matchesMiddle ? 174 : 324}px)`}
          required
          withAsterisk
          label={t('profile:new_password')}
          placeholder={t('profile:new_password') as string}
          value={form.values.newPassword}
          onChange={event =>
            form.setFieldValue('newPassword', event.currentTarget.value)
          }
          mb={25}
          error={form.errors.newPassword && t('common:password_include')}
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
          {t('profile:change_password')}
        </Button>
      </Group>
    </form>
  );
};
