import { NextPage } from 'next';
import { FC } from 'react';
import LikedPost from '../../content/My/LikedPost';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout/HeaderFooterLayout';

const LikedPostPage: NextPage & { Layout?: FC } = () => {
  return <LikedPost />;
};

LikedPostPage.Layout = HeaderFooterLayout;


export default LikedPostPage;
