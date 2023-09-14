import { NextPage } from 'next';
import { FC } from 'react';
import Profile from '../../content/Profile';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';

const ProfilePage: NextPage & { Layout?: FC } = () => {
  return <Profile />;
};

ProfilePage.Layout = HeaderFooterLayout;

export default ProfilePage;
