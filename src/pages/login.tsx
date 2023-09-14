import { NextPage } from 'next';
import { FC } from 'react';
import Login from '../content/Login';

const LoginPage: NextPage & { Layout?: FC } = () => {
  return <Login />;
};

export default LoginPage;
