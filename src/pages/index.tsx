import { NextPage } from 'next';
import { FC } from 'react';
import Home from '../content/Home';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';

const IndexPage: NextPage & { Layout?: FC } = () => {
  return <Home />;
};

IndexPage.Layout = HeaderFooterLayout;

export default IndexPage;
