import { NextPage } from 'next';
import { FC } from 'react';
import HostelDetail from '../../content/HostelList/HostelDetail';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';
import { useRouter } from 'next/router';

const HostelDetailPage: NextPage & { Layout?: FC } = () => {
  return <HostelDetail />;
};

HostelDetailPage.Layout = HeaderFooterLayout;

export default HostelDetailPage;
