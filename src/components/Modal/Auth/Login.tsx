import {
  Anchor,
  Button,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { motion } from 'framer-motion';
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
  const [signInWithEmailAndPassword, , loading, userError] =
    useSignInWithEmailAndPassword(auth);
  const theme = useMantineTheme();

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
          Login
        </Button>
      </Group>
    </form>
  );
};
