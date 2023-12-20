import { NextPage } from 'next';
import { FC } from 'react';
import Register from '../content/Register';
import Head from 'next/head';

const RegisterPage: NextPage & { Layout?: FC } = () => {
  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/hommie-thanhtc.appspot.com/o/favicon.jpg?alt=media&token=9fd556b4-5171-4805-b044-33b617479fdf"
        ></link>
        <title>Homie | Đăng ký</title>
      </Head>
      <Register />
    </>
  );
};

export default RegisterPage;
