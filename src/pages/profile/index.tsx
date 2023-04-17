import { GetStaticPropsContext, NextPage } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { InternalizationStaticProps } from '../index';

const Profile: NextPage<InternalizationStaticProps> = () => {
  return <div>Hello</div>;
};

export const getStaticProps: ({
  locale,
}: GetStaticPropsContext) => Promise<InternalizationStaticProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const config = await serverSideTranslations(locale ?? 'en', [
    'common',
    'notifications',
  ]);
  return {
    props: {
      ...config,
    },
  };
};

export default Profile;
