import { NextPage } from 'next';
import { FC } from 'react';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout/HeaderFooterLayout';
import Head from 'next/head';
import Security from '../../content/My/Security';

const MySecurityPage: NextPage & { Layout?: FC } = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/hommie-thanhtc.appspot.com/o/favicon.jpg?alt=media&token=9fd556b4-5171-4805-b044-33b617479fdf"
        ></link>
        <title>Homie | Quản lý thông tin</title>
      </Head>
      <Security />
    </>
  );
};

MySecurityPage.Layout = HeaderFooterLayout;

export default MySecurityPage;
