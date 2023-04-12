import {
  Divider,
  Group,
  Modal,
  Paper,
  Text,
  useMantineTheme,
} from '@mantine/core';
import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';
import { auth } from '../../../firebase/ClientApp';
import { GoogleButton } from '../../Navbar/AuthButtons/GoogleButton';
import { Login } from './Login';
import { SignUp } from './SignUp';

export const AuthModal: React.FC = () => {
  const [modalState, setModalState] = useRecoilState(authModalState);
  const theme = useMantineTheme();
  const [user] = useAuthState(auth);

  const handleClose = (): void =>
    setModalState(prev => ({ ...prev, open: false }));

  useEffect(() => {
    if (user) {
      handleClose();
    }
  }, [user]);

  return (
    <Modal
      opened={modalState.open}
      onClose={handleClose}
      centered
      overlayProps={{
        color:
          theme.colorScheme === 'dark'
            ? theme.colors.dark[9]
            : theme.colors.gray[2],
        opacity: 0.55,
        blur: 3,
      }}
    >
      <Paper radius="md" p="xl" withBorder>
        <Text
          size="lg"
          weight={500}
          variant="gradient"
          gradient={
            theme.colorScheme === 'dark'
              ? { from: 'orange', to: 'red', deg: 45 }
              : { from: 'indigo', to: 'cyan', deg: 45 }
          }
          sx={{ cursor: 'default' }}
        >
          Welcome to Describeit.
        </Text>

        <Group grow mb="md" mt="md">
          <GoogleButton />
        </Group>

        <Divider
          label="Or continue with email"
          labelPosition="center"
          my="lg"
        />

        {modalState.view === 'login' ? <Login /> : <SignUp />}
      </Paper>
    </Modal>
  );
};
