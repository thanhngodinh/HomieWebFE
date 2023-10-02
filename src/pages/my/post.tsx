import { NextPage } from 'next';
import { FC } from 'react';
import MyPost from '../../content/My/MyPost';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout/HeaderFooterLayout';

const MyPostPage: NextPage & { Layout?: FC } = () => {
  return <MyPost />;
};

MyPostPage.Layout = HeaderFooterLayout;


export default MyPostPage;
