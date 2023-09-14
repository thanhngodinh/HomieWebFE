import { NextPage } from 'next';
import { FC } from 'react';
import ManagePost from '../../content/ManagePost';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';

const ManagePostPage: NextPage & { Layout?: FC } = () => {
  return <ManagePost />;
};

ManagePostPage.Layout = HeaderFooterLayout;

export default ManagePostPage;
