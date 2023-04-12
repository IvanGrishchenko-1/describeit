import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/ClientApp';
import { FIREBASE_ERRORS } from '../../../firebase/Errors';

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
  const [signInWithEmailAndPassword, user , loading, userError] =
    useSignInWithEmailAndPassword(auth);

  const handleOnSubmit = (): void => {
    signInWithEmailAndPassword(form.values.email, form.values.password);
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Stack>
        <TextInput
          required
          label="Email"
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
          label="Password"
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

        {userError && (
          <Text align="center" color="red">
            {FIREBASE_ERRORS[userError.message as keyof typeof FIREBASE_ERRORS]}
          </Text>
        )}
      </Stack>

      <Group position="apart" mt="xl">
        <Anchor
          component="button"
          type="button"
          color="dimmed"
          onClick={() => setModalState(prev => ({ ...prev, view: 'signup' }))}
          size="xs"
        >
          {`Don't have an account? Register`}
        </Anchor>
        <Button type="submit" radius="xl" loading={loading}>
          Login
        </Button>
      </Group>
    </form>
  );
};
