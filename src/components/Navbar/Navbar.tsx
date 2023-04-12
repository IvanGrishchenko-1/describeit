import {
  ActionIcon,
  Box,
  createStyles,
  Group,
  Header,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconMenu2, IconMoonStars, IconSun } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React, { memo } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';

import { auth } from '../../firebase/ClientApp';
import { AuthButtons } from './AuthButtons/AuthButtons';
import { UserMenu } from './UserMenu/UserMenu';

const useStyles = createStyles(theme => ({
  title: {
    cursor: 'default',
    color: 'inherit',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? theme.fn.linearGradient(45, 'orange', 'red')
        : theme.fn.linearGradient(45, 'indigo', 'cyan'),
  },
  actionIcon: {
    backgroundColor:
      theme.colorScheme === 'dark'
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
    color:
      theme.colorScheme === 'dark'
        ? theme.colors.yellow[4]
        : theme.colors.blue[6],
  },
  hiddenDesktop: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },
}));

const NavbarComponent: React.FC = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const matchesDesktop = useMediaQuery('(min-width: 768px)', true, {
    getInitialValueInEffect: false,
  });
  const [user] = useAuthState(auth);

  return (
    <Box pb={120}>
      <Header height={60} px="md" fixed>
        <Group position="apart" sx={{ height: '100%' }}>
          <Group
            position="center"
            sx={{ height: '100%' }}
            spacing={matchesDesktop ? 'xl' : 'sm'}
          >
            <ActionIcon
              size="lg"
              className={classes.actionIcon && classes.hiddenDesktop}
            >
              <IconMenu2 size={20} stroke={1.5} />
            </ActionIcon>
            <Title
              order={matchesDesktop ? 1 : 4}
              variant="gradient"
              className={classes.title}
            >
              Describeit.
            </Title>
          </Group>
          <Group
            position="center"
            sx={{ height: '100%' }}
            spacing={matchesDesktop ? 'xl' : 'sm'}
          >
            <ActionIcon
              component={motion.button}
              size="lg"
              className={classes.actionIcon}
              onClick={() => toggleColorScheme()}
              whileHover={{
                scale: [1, 1.1, 1.2, 1],
                rotate: [0, 90, 270, 0],
              }}
            >
              {colorScheme === 'dark' ? (
                <IconSun size={20} stroke={1.5} />
              ) : (
                <IconMoonStars size={20} stroke={1.5} />
              )}
            </ActionIcon>
            {user ? (
              <UserMenu />
            ) : (
              <AuthButtons mobileClasses={classes.actionIcon} />
            )}
          </Group>
        </Group>
      </Header>
    </Box>
  );
};

export const Navbar = memo(NavbarComponent);
