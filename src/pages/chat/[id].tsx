import { NextPage } from 'next';
import { FC } from 'react';
import Chat from '../../content/Chat';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';

const ChatPage: NextPage & { Layout?: FC } = () => {
  return <Chat />;
};

ChatPage.Layout = HeaderFooterLayout;

export default ChatPage;
