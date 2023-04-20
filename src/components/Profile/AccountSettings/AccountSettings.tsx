import { User } from '@firebase/auth';
import { createStyles, Paper, Stack, Tabs, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { useTranslation } from 'next-i18next';
import React from 'react';

import { AvatarUploader } from '../../Dropzone/AvatarUploader';
import { DropzoneButton } from '../../Dropzone/Dropzone';
import { ChangeDisplayName } from './ChangeDisplayName';
import { ChangePassword } from './ChangePassword';

type AccountSettingsProps = {
  user?: User | null;
};

const useStyles = createStyles(theme => ({
  title: {
    cursor: 'default',
    color: 'inherit',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? theme.fn.linearGradient(45, 'orange', 'red')
        : theme.fn.linearGradient(45, 'indigo', 'cyan'),
  },
}));

export const AccountSettings: React.FC<AccountSettingsProps> = ({ user }) => {
  const { classes } = useStyles();
  const { t } = useTranslation();
  const matchesMiddle = useMediaQuery('(max-width: 992px)', true, {
    getInitialValueInEffect: false,
  });

  return (
    <Tabs.Panel value="account-settings">
      <Paper shadow="md" radius="md" p="md" withBorder>
        <Stack justify="flex-start" spacing="xl">
          <Title order={1} variant="gradient" className={classes.title}>
            {`${t('profile:your_profile')}${
              user?.displayName !== null ? `, ${user?.displayName}` : ''
            }`}
          </Title>
          <ChangeDisplayName user={user} matchesMiddle={matchesMiddle} />
          <ChangePassword matchesMiddle={matchesMiddle} />
          {user?.photoURL ? (
            <AvatarUploader
              photoUrl={user.photoURL}
              userUid={user.uid}
              matchesMiddle={matchesMiddle}
            />
          ) : (
            <DropzoneButton
              photoUrl={user?.photoURL}
              userUid={user?.uid}
              matchesMiddle={matchesMiddle}
            />
          )}
        </Stack>
      </Paper>
    </Tabs.Panel>
  );
};
