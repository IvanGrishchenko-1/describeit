import { User } from '@firebase/auth';
import { doc, setDoc } from '@firebase/firestore';
import { Button, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconBrandGoogle } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'next-i18next';
import React, { Fragment } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth, firestore } from '../../../firebase/ClientApp';
import { error, success } from '../../Notifications/Notifications';

export const GoogleButton: React.FC = () => {
  const theme = useMantineTheme();
  const [signInWithGoogle, , loading, userError] = useSignInWithGoogle(auth);
  const matchesDesktop = useMediaQuery('(min-width: 768px)', true, {
    getInitialValueInEffect: false,
  });
  const { t } = useTranslation();

  const createUserDoc = async (user: User): Promise<void> => {
    const userDocRef = doc(firestore, 'users', user.uid);
    const userToSave = JSON.parse(JSON.stringify(user));
    await setDoc(userDocRef, userToSave);
  };

  const handleGoogleClick = async (): Promise<void> => {
    const userCredentials = await signInWithGoogle();
    if (userCredentials) {
      notifications.show({ title: 'Success', message: 'Success', ...success });
      createUserDoc(userCredentials.user);
    } else {
      notifications.show({ title: 'Error', message: 'Error', ...error });
    }
  };

  return (
    <Fragment>
      <Button
        component={motion.button}
        onClick={handleGoogleClick}
        radius="md"
        leftIcon={<IconBrandGoogle />}
        variant="gradient"
        loading={loading}
        gradient={
          theme.colorScheme === 'dark'
            ? { from: 'orange', to: 'red', deg: 45 }
            : { from: 'indigo', to: 'cyan', deg: 45 }
        }
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        {matchesDesktop ? t('common:continue_w_google') : 'Google'}
      </Button>
      {userError && <Text color="red">{userError?.message}</Text>}
    </Fragment>
  );
};
