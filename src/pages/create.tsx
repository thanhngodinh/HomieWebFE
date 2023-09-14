import { NextPage } from 'next';
import { FC } from 'react';
import CreatePost from '../content/CreatePost';
import HeaderFooterLayout from '../layouts/HeaderFooterLayout';

const CreatePostPage: NextPage & { Layout?: FC } = () => {
  return <CreatePost />;
};

CreatePostPage.Layout = HeaderFooterLayout;

export default CreatePostPage;
