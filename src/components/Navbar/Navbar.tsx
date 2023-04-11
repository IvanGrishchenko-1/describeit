import {
  ActionIcon,
  Box,
  Button,
  createStyles,
  Group,
  Header,
  Title,
  useMantineColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { IconMenu2, IconMoonStars, IconSun } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import React, { Fragment } from 'react';

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

export const Navbar: React.FC = () => {
  const { classes } = useStyles();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const matchesMobile = useMediaQuery('(min-width: 768px)', true, {
    getInitialValueInEffect: false,
  });

  return (
    <Box pb={120}>
      <Header height={60} px="md" fixed>
        <Group position="apart" sx={{ height: '100%' }}>
          <Group position="center" sx={{ height: '100%' }}>
            <ActionIcon
              size="lg"
              className={classes.actionIcon && classes.hiddenDesktop}
            >
              <IconMenu2 size={20} stroke={1.5} />
            </ActionIcon>
            <Title
              order={matchesMobile ? 1 : 3}
              variant="gradient"
              className={classes.title}
            >
              Describeit.
            </Title>
          </Group>
          <Group position="center" sx={{ height: '100%' }} spacing="xl">
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
            {matchesMobile ? (
              <Fragment>
                <Button
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
              <Fragment />
            )}
          </Group>
        </Group>
      </Header>
    </Box>
  );
};
