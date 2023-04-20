import { Center, createStyles, Paper, Title } from '@mantine/core';
import { useTranslation } from 'next-i18next';
import React from 'react';

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

export const SignInPaper: React.FC = () => {
  const { classes } = useStyles();
  const { t } = useTranslation();

  return (
    <Paper shadow="md" radius="md" p="md" withBorder h={500}>
      <Center inline h="100%" w="100%">
        <Title order={1} variant="gradient" className={classes.title}>
          {t('profile:sing_in_paper')}
        </Title>
      </Center>
    </Paper>
  );
};
