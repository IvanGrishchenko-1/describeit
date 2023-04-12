import { Button, useMantineColorScheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import React, { Fragment } from 'react';
import { useSetRecoilState } from 'recoil';

import { authModalState } from '../../../atoms/authModalAtom';
import { AuthModal } from '../../Modal/Auth/AuthModal';
import { AuthProps, MobileAuth } from './MobileAuth';

export const AuthButtons: React.FC<AuthProps> = ({ mobileClasses }) => {
  const setAuthModalState = useSetRecoilState(authModalState);
  const { colorScheme } = useMantineColorScheme();
  const matchesDesktop = useMediaQuery('(min-width: 768px)', true, {
    getInitialValueInEffect: false,
  });

  return (
    <Fragment>
      <AuthModal />
      {matchesDesktop ? (
        <Fragment>
          <Button
            onClick={() => setAuthModalState({ open: true, view: 'login' })}
            component={motion.button}
            size="sm"
            variant="gradient"
            gradient={
              colorScheme === 'dark'
                ? { from: 'orange', to: 'red', deg: 45 }
                : { from: 'indigo', to: 'cyan', deg: 45 }
            }
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Log In
          </Button>
          <Button
            onClick={() => setAuthModalState({ open: true, view: 'signup' })}
            component={motion.button}
            size="sm"
            variant="outline"
            color={colorScheme === 'dark' ? 'orange' : 'indigo'}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            Sign Up
          </Button>
        </Fragment>
      ) : (
        <MobileAuth mobileClasses={mobileClasses} />
      )}
    </Fragment>
  );
};
