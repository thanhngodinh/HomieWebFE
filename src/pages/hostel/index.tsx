import { NextPage } from 'next';
import { FC } from 'react';
import HostelPostList from '../../content/HostelList/HostelPostList';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';

const HostelListPage: NextPage & { Layout?: FC } = () => {
  return <HostelPostList />;
};

HostelListPage.Layout = HeaderFooterLayout;

export default HostelListPage;
