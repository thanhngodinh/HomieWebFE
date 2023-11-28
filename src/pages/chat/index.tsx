import { NextPage } from 'next';
import { FC } from 'react';
import Chat from '../../content/Chat';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';

const MyChat: NextPage & { Layout?: FC } = () => {
  return <Chat />;
};

MyChat.Layout = HeaderFooterLayout;

export default MyChat;
