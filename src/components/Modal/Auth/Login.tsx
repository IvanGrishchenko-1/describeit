import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Stack,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { notifications } from '@mantine/notifications';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/ClientApp';
import { error, success } from '../../Notifications/Notifications';

export const Login: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);
  const form = useForm({
    initialValues: {
      email: '',
      password: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
    },
  });
  const [signInWithEmailAndPassword, , loading, userError] =
    useSignInWithEmailAndPassword(auth);
  const theme = useMantineTheme();
  const { t } = useTranslation();

  const handleOnSubmit = async (): Promise<void> => {
    const userCredential = await signInWithEmailAndPassword(
      form.values.email,
      form.values.password,
    );
    !userCredential
      ? notifications.show({
          title: t('notifications:oops'),
          message: t(`notifications:${userError?.code}`),
          ...error,
        })
      : notifications.show({
          title: t('notifications:success_login_title'),
          message: t('notifications:success_login_message'),
          ...success,
        });
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Stack>
        <TextInput
          required
          label={t('common:email')}
          placeholder="hello@mantine.dev"
          value={form.values.email}
          onChange={event =>
            form.setFieldValue('email', event.currentTarget.value)
          }
          error={form.errors.email && 'Invalid email'}
          radius="md"
        />

        <PasswordInput
          required
          label={t('common:password')}
          placeholder="Your password"
          value={form.values.password}
          onChange={event =>
            form.setFieldValue('password', event.currentTarget.value)
          }
          error={
            form.errors.password &&
            'Password should include at least 6 characters'
          }
          radius="md"
        />
      </Stack>

      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => setModalState(prev => ({ ...prev, view: 'signup' }))}
          size="xs"
        >
          {t("common:don't_have_account")}
        </Anchor>
        <Button
          component={motion.button}
          type="submit"
          radius="md"
          loading={loading}
          variant="gradient"
          gradient={
            theme.colorScheme === 'dark'
              ? { from: 'orange', to: 'red', deg: 45 }
              : { from: 'indigo', to: 'cyan', deg: 45 }
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {t('common:log_in')}
        </Button>
      </Group>
    </form>
  );
};
