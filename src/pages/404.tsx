import {
  Button,
  Center,
  createStyles,
  Flex,
  Text,
  Title,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { GetStaticPropsContext, NextPage } from 'next';
import Link from 'next/link';
import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { Fragment, useRef } from 'react';

import { InternalizationStaticProps } from './index';

const useStyles = createStyles(theme => ({
  root: {
    width: '100vw',
    height: '100vh',
    [theme.fn.smallerThan('sm')]: {
      alignItems: 'start',
      padding: `0 ${theme.spacing.xl}`,
      marginTop: 80,
      height: 'fit-content',
    },
  },

  drag_area: {
    background:
      theme.colorScheme === 'dark'
        ? theme.fn.linearGradient(
            45,
            theme.colors.orange[3],
            theme.colors.red[3],
          )
        : theme.fn.linearGradient(
            45,
            theme.colors.indigo[3],
            theme.colors.cyan[3],
          ),
    position: 'relative',
    width: 600,
    height: 600,
    borderRadius: theme.radius.sm,
    [theme.fn.smallerThan('sm')]: {
      width: 300,
      height: 300,
    },
  },

  title: {
    cursor: 'default',
    color: 'inherit',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? theme.fn.linearGradient(45, 'orange', 'red')
        : theme.fn.linearGradient(45, 'indigo', 'cyan'),
  },
}));

const desktopAnimations = {
  x: [250, 0, 300, 470, 250],
  y: [0, 350, 510, 350, 0],
};

const mobileAnimations = {
  x: [75, 0, 120, 175, 75],
  y: [0, 175, 200, 175, 0],
};

const Custom404: NextPage = () => {
  const { classes } = useStyles();
  const constraintsRef = useRef<HTMLDivElement>(null);
  const theme = useMantineTheme();
  const matchesDesktop = useMediaQuery('(min-width: 768px)', true, {
    getInitialValueInEffect: false,
  });
  const { t } = useTranslation();

  return (
    <Fragment>
      <NextSeo title="404" description="Page not found" />
      <Center className={classes.root}>
        <Flex
          direction="row"
          gap={matchesDesktop ? 100 : 50}
          h={600}
          justify="center"
          wrap="wrap"
        >
          <Flex direction="column" gap="md" w={300}>
            <Title order={1} className={classes.title} variant="gradient">
              {t('404:title')}
            </Title>
            <Title order={4}>{t('404:message')}</Title>
            <Link href="/" style={{ marginTop: 'auto' }}>
              <Button
                component={motion.button}
                w="100%"
                radius="sm"
                variant="gradient"
                gradient={
                  theme.colorScheme === 'dark'
                    ? { from: 'orange', to: 'red', deg: 45 }
                    : { from: 'indigo', to: 'cyan', deg: 45 }
                }
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                {t('404:button')}
              </Button>
            </Link>
          </Flex>
          <motion.div className={classes.drag_area} ref={constraintsRef}>
            <Text
              component={motion.div}
              animate={matchesDesktop ? desktopAnimations : mobileAnimations}
              transition={{ repeat: Infinity, duration: 10 }}
              drag
              dragConstraints={constraintsRef}
              pos="absolute"
              variant="gradient"
              sx={{ cursor: 'grab' }}
              gradient={
                theme.colorScheme === 'dark'
                  ? { from: 'orange', to: 'red', deg: 45 }
                  : { from: 'indigo', to: 'cyan', deg: 45 }
              }
              fz={70}
              fw={900}
            >
              404
            </Text>
          </motion.div>
        </Flex>
      </Center>
    </Fragment>
  );
};

export const getStaticProps: ({
  locale,
}: GetStaticPropsContext) => Promise<InternalizationStaticProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const config = await serverSideTranslations(locale ?? 'en', [
    'common',
    'notifications',
    '404',
  ]);
  return {
    props: {
      ...config,
    },
  };
};

export default Custom404;
