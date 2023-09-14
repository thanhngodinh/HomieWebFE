import { NextPage } from 'next';
import { FC } from 'react';
import Register from '../content/Register';

const RegisterPage: NextPage & { Layout?: FC } = () => {
  return <Register />;
};

export default RegisterPage;
