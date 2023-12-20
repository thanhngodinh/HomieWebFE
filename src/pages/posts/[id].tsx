import { NextPage } from 'next';
import { FC } from 'react';
import HostelDetail from '../../content/HostelList/HostelDetail';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';
import Head from 'next/head';
import Logo from '../../assets/img/icons8-google-48.png'

const HostelDetailPage: NextPage & { Layout?: FC } = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/hommie-thanhtc.appspot.com/o/favicon.jpg?alt=media&token=9fd556b4-5171-4805-b044-33b617479fdf"
        ></link>
        <title>Homie | Chi tiết</title>
      </Head>
      <HostelDetail />
    </>
  );
};

HostelDetailPage.Layout = HeaderFooterLayout;

export default HostelDetailPage;
