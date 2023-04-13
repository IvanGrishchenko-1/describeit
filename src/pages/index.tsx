import { GetStaticPropsContext, NextPage } from 'next';
import { UserConfig, useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { Fragment } from 'react';

export type CustomInternalizationConfig = {
  _nextI18Next?: {
    initialI18nStore: any;
    initialLocale: string;
    ns: string[];
    userConfig: UserConfig | null;
  };
};

export interface InternalizationStaticProps {
  props: CustomInternalizationConfig;
}

const HomePage: NextPage<InternalizationStaticProps> = () => {
  const { t } = useTranslation();
  return (
    <Fragment>
      <h1>{t('home:welcome_msg')}</h1>
    </Fragment>
  );
};

export const getStaticProps: ({
  locale,
}: GetStaticPropsContext) => Promise<InternalizationStaticProps> = async ({
  locale,
}: GetStaticPropsContext) => {
  const config = await serverSideTranslations(locale ?? 'en', ['home']);
  return {
    props: {
      ...config,
    },
  };
};

export default HomePage;
