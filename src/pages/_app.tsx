import { Provider } from 'react-redux';
import { FC } from 'react';
import type { AppProps } from 'next/app';
import React from 'react';
import { store } from '../app/store';
import BaseLayout from '../layouts/BaseLayout';
import './style.css';

type MyAppProps = AppProps & {
  Component: AppProps['Component'] & { Layout?: FC };
};

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const PageLayout = Component.Layout || BaseLayout;

  return (
    <Provider store={store}>
      <PageLayout>
        <Component {...pageProps} />
      </PageLayout>
    </Provider>
  );
};

export default MyApp;
