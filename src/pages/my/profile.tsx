import { NextPage } from 'next';
import { FC } from 'react';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout/HeaderFooterLayout';
import Profile from '../../content/My/Profile';

const MyProfilePage: NextPage & { Layout?: FC } = () => {
  return <Profile />;
};

MyProfilePage.Layout = HeaderFooterLayout;


export default MyProfilePage;
