import { User } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
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
import {
  useCreateUserWithEmailAndPassword,
  useUpdateProfile,
} from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';
import { auth, firestore } from '../../../firebase/ClientApp';
import { error, success } from '../../Notifications/Notifications';

export const SignUp: React.FC = () => {
  const setModalState = useSetRecoilState(authModalState);
  const form = useForm({
    initialValues: {
      name: '',
      email: '',
      password: '',
      confirmPassword: '',
    },

    validate: {
      email: val => (/^\S+@\S+$/.test(val) ? null : 'Invalid email'),
      password: val =>
        val.length <= 6
          ? 'Password should include at least 6 characters'
          : null,
      confirmPassword: (value, values) =>
        value !== values.password ? 'Passwords did not match' : null,
    },
  });
  const [createUserWithEmailAndPassword, , loading, userError] =
    useCreateUserWithEmailAndPassword(auth);
  const [updateProfile, updating] = useUpdateProfile(auth);
  const theme = useMantineTheme();
  const { t } = useTranslation();

  const createUserDoc = async (user: User): Promise<void> => {
    const userToSave = JSON.parse(JSON.stringify(user));
    const userDocRef = doc(firestore, 'users', user.uid);
    await setDoc(userDocRef, userToSave);
  };

  const handleOnSubmit = async (): Promise<void> => {
    const userCredentials = await createUserWithEmailAndPassword(
      form.values.email,
      form.values.password,
    );
    if (form.values.name) {
      await updateProfile({ displayName: form.values.name });
    }
    if (userCredentials) {
      notifications.show({
        title: t('notifications:success_signup_title'),
        message: t('notifications:success_signup_message'),
        ...success,
      });
      createUserDoc(userCredentials.user);
    } else {
      notifications.show({
        title: t('notifications:oops'),
        message: t(`notifications:${userError?.code}`),
        ...error,
      });
    }
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Stack>
        <TextInput
          label={t('common:name')}
          placeholder="Your name"
          value={form.values.name}
          onChange={event =>
            form.setFieldValue('name', event.currentTarget.value)
          }
          radius="md"
        />

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

        <PasswordInput
          required
          label={t('common:confirm_password')}
          placeholder="Confirm password"
          value={form.values.confirmPassword}
          onChange={event =>
            form.setFieldValue('confirmPassword', event.currentTarget.value)
          }
          error={form.errors.confirmPassword && 'Passwords should match'}
          radius="md"
        />
      </Stack>

      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => setModalState(prev => ({ ...prev, view: 'login' }))}
          size="xs"
        >
          {t('common:have_an_account')}
        </Anchor>
        <Button
          component={motion.button}
          type="submit"
          radius="md"
          loading={loading || updating}
          variant="gradient"
          gradient={
            theme.colorScheme === 'dark'
              ? { from: 'orange', to: 'red', deg: 45 }
              : { from: 'indigo', to: 'cyan', deg: 45 }
          }
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {t('common:register')}
        </Button>
      </Group>
    </form>
  );
};
