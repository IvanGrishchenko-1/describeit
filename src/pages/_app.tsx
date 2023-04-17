import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { getCookie, setCookie } from 'cookies-next';
import { GetServerSidePropsContext } from 'next';
import { AppProps } from 'next/app';
import Head from 'next/head';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import React, { ReactElement, useState } from 'react';
import { RecoilRoot } from 'recoil';

import { ltrCache } from '../../ltr-cache';
import { Layout } from '../components/Layout';

function App(props: AppProps & { colorScheme: ColorScheme }): ReactElement {
  const { Component, pageProps } = props;
  const [colorScheme, setColorScheme] = useState<ColorScheme>(
    props.colorScheme,
  );

  const toggleColorScheme = (value?: ColorScheme): void => {
    const nextColorScheme =
      value || (colorScheme === 'dark' ? 'light' : 'dark');
    setColorScheme(nextColorScheme);
    setCookie('mantine-color-scheme', nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  return (
    <RecoilRoot>
      <Head>
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>

      <DefaultSeo
        openGraph={{
          type: 'website',
          url: 'https://describeit-inky.vercel.app/',
          title: 'Open Graph Title',
          description: 'Open Graph Description',
          images: [
            {
              url: 'https://res.cloudinary.com/wavesrealm/image/upload/v1681387476/logo_rwctrz.png',
              width: 1200,
              height: 1200,
              alt: 'Og Image Alt',
            },
          ],
        }}
      />

      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{ colorScheme, dir: 'ltr' }}
          emotionCache={ltrCache}
        >
          <Notifications />
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </MantineProvider>
      </ColorSchemeProvider>
    </RecoilRoot>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie('mantine-color-scheme', ctx) || 'light',
});

export default appWithTranslation(App);
