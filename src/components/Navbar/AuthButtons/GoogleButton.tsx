import { Button, Text, useMantineTheme } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconBrandGoogle } from '@tabler/icons-react';
import React, { Fragment } from 'react';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';

import { auth } from '../../../firebase/ClientApp';

export const GoogleButton: React.FC = () => {
  const theme = useMantineTheme();
  const [signInWithGoogle, , loading, error] = useSignInWithGoogle(auth);
  const matchesDesktop = useMediaQuery('(min-width: 768px)', true, {
    getInitialValueInEffect: false,
  });

  return (
    <Fragment>
      <Button
        onClick={() => signInWithGoogle()}
        radius="md"
        leftIcon={<IconBrandGoogle />}
        variant="gradient"
        loading={loading}
        gradient={
          theme.colorScheme === 'dark'
            ? { from: 'orange', to: 'red', deg: 45 }
            : { from: 'indigo', to: 'cyan', deg: 45 }
        }
      >
        {matchesDesktop ? 'Continue with Google' : 'With Google'}
      </Button>
      {error && <Text color="red">{error.message}</Text>}
    </Fragment>
  );
};
