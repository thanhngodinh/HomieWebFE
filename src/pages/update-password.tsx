import { NextPage } from 'next';
import { FC } from 'react';
import UpdatePassword from '../content/UpdatePassword';

const UpdatePasswordPage: NextPage & { Layout?: FC } = () => {
  return <UpdatePassword />;
};

export default UpdatePasswordPage;
