import { NextPage } from 'next';
import { FC } from 'react';
import ShareList from '../content/ShareList';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';

const ShareListPage: NextPage & { Layout?: FC } = () => {
  return <ShareList />;
};

ShareListPage.Layout = HeaderFooterLayout;

export default ShareListPage;
