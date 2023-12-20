import { NextPage } from 'next';
import { FC } from 'react';
import RoommateList from '../content/RoommateList';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';
import Head from 'next/head';

const RoommateListPage: NextPage & { Layout?: FC } = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/hommie-thanhtc.appspot.com/o/favicon.jpg?alt=media&token=9fd556b4-5171-4805-b044-33b617479fdf"
        ></link>
        <title>Homie | Tìm bạn</title>
      </Head>
      <RoommateList />
    </>
  );
};

RoommateListPage.Layout = HeaderFooterLayout;

export default RoommateListPage;
