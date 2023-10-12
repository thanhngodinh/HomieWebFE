import { NextPage } from 'next';
import { FC } from 'react';
import RoommateList from '../content/RoommateList';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';

const RoommateListPage: NextPage & { Layout?: FC } = () => {
  return <RoommateList />;
};

RoommateListPage.Layout = HeaderFooterLayout;

export default RoommateListPage;
