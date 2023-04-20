import {
  Container,
  createStyles,
  rem,
  Tabs,
  useMantineTheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import {
  IconBookmark,
  IconHeart,
  IconPlus,
  IconSettings,
  IconTrash,
} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { GetStaticPropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { Fragment } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useRecoilValue } from 'recoil';

import { profileTabAtom } from '../../atoms/profileTabAtom';
import { AccountSettings } from '../../components/Profile/AccountSettings';
import { SignInPaper } from '../../components/Profile/SignInPaper';
import { TabProps } from '../../components/Tabs/Tab';
import { Tabs as CustomTabs } from '../../components/Tabs/Tabs';
import { auth } from '../../firebase/ClientApp';
import { InternalizationStaticProps } from '../index';

const tabs: TabProps[] = [
  {
    value: 'account-settings',
    i18nKey: 'tabs:account-settings',
    icon: <IconSettings />,
  },
  { value: 'your-posts', i18nKey: 'tabs:your-posts', icon: <IconBookmark /> },
  { value: 'liked-posts', i18nKey: 'tabs:liked-posts', icon: <IconHeart /> },
  { value: 'create-post', i18nKey: 'tabs:create-post', icon: <IconPlus /> },
  {
    value: 'delete-account',
    i18nKey: 'tabs:delete-account',
    icon: <IconTrash />,
  },
];

const useStyles = createStyles(theme => ({
  root: {
    marginTop: 80,
    aspectRatio: '960/300',
    width: '100%',
    height: '100vh',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    backgroundImage:
      theme.colorScheme === 'dark'
        ? 'url(/icons/dark-profile-peaks.svg)'
        : 'url(/icons/light-profile-peaks.svg)',
  },
  panel: {
    width: '100%',
    padding: `0 ${rem(16)}`,
  },
}));

const Profile: NextPage<InternalizationStaticProps> = () => {
  const { classes } = useStyles();
  const theme = useMantineTheme();
  const { value } = useRecoilValue(profileTabAtom);
  const matchesDesktop = useMediaQuery('(min-width: 768px)', true, {
    getInitialValueInEffect: false,
  });
  const [user] = useAuthState(auth);

  return (
    <div className={classes.root}>
      <NextSeo title="Profile" description="Manage your profile" />
      <Container px="md" fluid>
        <motion.div
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1, transition: { delay: 0.1 } }}
          exit={{ x: -100, opacity: 0 }}
        >
          <Tabs
            variant="pills"
            defaultValue={value}
            orientation="vertical"
            color={theme.colorScheme === 'dark' ? 'orange' : 'indigo'}
          >
            {matchesDesktop && (
              <Tabs.List>
                <CustomTabs tabs={tabs} />
              </Tabs.List>
            )}

            <div className={classes.panel}>
              {user ? (
                <Fragment>
                  <AccountSettings user={user} />
                </Fragment>
              ) : (
                <SignInPaper />
              )}
            </div>
          </Tabs>
        </motion.div>
      </Container>
    </div>
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
    'tabs',
    'profile',
  ]);
  return {
    props: {
      ...config,
    },
  };
};

export default Profile;
