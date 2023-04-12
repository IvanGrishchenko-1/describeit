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
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSetRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/ClientApp';
import { FIREBASE_ERRORS } from '../../../firebase/Errors';

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

  const handleOnSubmit = (): void => {
    createUserWithEmailAndPassword(form.values.email, form.values.password);
  };

  return (
    <form onSubmit={form.onSubmit(handleOnSubmit)}>
      <Stack>
        <TextInput
          label="Name"
          placeholder="Your name"
          value={form.values.name}
          onChange={event =>
            form.setFieldValue('name', event.currentTarget.value)
          }
          radius="md"
        />

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

        <PasswordInput
          required
          label="Confirm password"
          placeholder="Confirm password"
          value={form.values.confirmPassword}
          onChange={event =>
            form.setFieldValue('confirmPassword', event.currentTarget.value)
          }
          error={form.errors.confirmPassword && 'Passwords should match'}
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
          onClick={() => setModalState(prev => ({ ...prev, view: 'login' }))}
          size="xs"
        >
          Already have an account? Login
        </Anchor>
        <Button type="submit" radius="xl" loading={loading}>
          Register
        </Button>
      </Group>
    </form>
  );
};
