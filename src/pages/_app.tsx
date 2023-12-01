import { Provider } from 'react-redux';
import { FC } from 'react';
import type { AppProps } from 'next/app';
import React from 'react';
import BaseLayout from '../layouts/BaseLayout';
import './style.css';
import '../assets/scss/text.scss';
import '../assets/scss/common.scss';
import '../assets/scss/input.scss';
import '../assets/scss/button.scss';
import { storeRedux } from '../app/store';

import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faKitchenSet,
  faWifi,
  faTableColumns,
  faTemperatureHalf,
  faSnowflake,
  faDog,
  faBoxesPacking,
  faBed,
  faMotorcycle,
  faRestroom,
  faCamera,
  faSun,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import { getToken } from '../app/token';
import FloatChat from '../components/FloatChat';
import { useRouter } from 'next/router';


library.add(
  faKitchenSet,
  faWifi,
  faTableColumns,
  faTemperatureHalf,
  faSnowflake,
  faDog,
  faBoxesPacking,
  faBed,
  faSun,
  faMotorcycle,
  faRestroom,
  faCamera,
  faHeart,
  faHeartRegular
);

type MyAppProps = AppProps & {
  Component: AppProps['Component'] & { Layout?: FC };
};

const MyApp = ({ Component, pageProps }: MyAppProps) => {
  const router = useRouter();
  const path = router.pathname; 
  const PageLayout = Component.Layout || BaseLayout;

  return (
    <Provider store={storeRedux}>
      <PageLayout>
        <Component {...pageProps} />
        {typeof window !== 'undefined' && !path.includes("chat") && getToken() ?
          <FloatChat />: <></>
        }
      </PageLayout>
    </Provider>
  );
};

export default MyApp;
