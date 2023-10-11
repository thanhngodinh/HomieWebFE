import { NextPage } from 'next';
import { FC } from 'react';
import HostelPostList from '../../content/HostelList/HostelPostList';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';
import SearchBar from '../../components/SearchBar';

const HostelListPage: NextPage & { Layout?: FC } = () => {
  return (
    <>
      <SearchBar keySearch='name'  navigateTo="/hostel/search"/>
      <HostelPostList />
    </>
  )
};

HostelListPage.Layout = HeaderFooterLayout;

export default HostelListPage;
