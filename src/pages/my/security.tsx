import { NextPage } from 'next';
import { FC } from 'react';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout/HeaderFooterLayout';

import Security from '../../content/My/Security';

const MySecurityPage: NextPage & { Layout?: FC } = () => {
  return <Security />;
};

MySecurityPage.Layout = HeaderFooterLayout;


export default MySecurityPage;
