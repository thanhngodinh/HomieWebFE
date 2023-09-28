import { NextPage } from 'next';
import { FC } from 'react';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';
import MyPost from '../../content/My/MyPost';

const MyPostPage: NextPage & { Layout?: FC } = () => {
  return <MyPost />;
};

MyPostPage.Layout = HeaderFooterLayout;

export default MyPostPage;
