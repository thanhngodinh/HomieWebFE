import { NextPage } from 'next';
import { FC } from 'react';
import UpdatePassword from '../content/UpdatePassword';
import Head from 'next/head';

const UpdatePasswordPage: NextPage & { Layout?: FC } = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/hommie-thanhtc.appspot.com/o/favicon.jpg?alt=media&token=9fd556b4-5171-4805-b044-33b617479fdf"
        ></link>
        <title>Homie | Mật khẩu</title>
      </Head>
      <UpdatePassword />
    </>
  );
};

export default UpdatePasswordPage;
