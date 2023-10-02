import { Provider } from 'react-redux';
import { FC } from 'react';
import type { AppProps } from 'next/app';
import React from 'react';
import BaseLayout from '../layouts/BaseLayout';
import './style.css';
import '../assets/scss/text.scss';
import '../assets/scss/button.scss';
import { storeRedux } from '../app/store';

type MyAppProps = AppProps & {
  Component: AppProps['Component'] & { Layout?: FC };
};

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const PageLayout = Component.Layout || BaseLayout;

  return (
    <Provider store={storeRedux}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </Provider>
  );
};

export default MyApp;
