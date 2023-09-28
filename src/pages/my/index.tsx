import { NextPage } from 'next';
import { FC } from 'react';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';
import MyPost from '../../content/My/MyPost';

const MyPage: NextPage & { Layout?: FC } = () => {
  return <MyPost />;
};

MyPage.Layout = HeaderFooterLayout;

export default MyPage;
