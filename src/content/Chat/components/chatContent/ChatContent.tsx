import React, { Component, useState, createRef, useEffect } from 'react';
import styles from './chatContent.module.scss';
import classNames from 'classnames/bind';
import { UploadOutlined } from '@ant-design/icons';
import Avatar from '../chatList/Avatar';
import ChatItem from './ChatItem';
import { Button, Form, Upload } from 'antd';
import { useForm } from 'react-hook-form';
import { updateDocument } from '../../../../firebase/service';
import Chat, { Room } from '../../Chat';
import { serverTimestamp } from 'firebase/firestore';
import { User } from '../../../../models';
import { formatShortDate, formatShortDateTime } from '../../../../utils/date';

const cx = classNames.bind(styles);

// type ChatContentType = {
//   chat?: Chat[];
//   msg?: string;
// };

// type Chat = {
//   key: number;
//   image: string;
//   type: string;
//   msg: string;
// };

interface ChatContentProps {
  data?: Room;
  user?: User;
  me?: User;
}
const ChatContent = ({data,user,me}: ChatContentProps) => {
  const [form] = Form.useForm();
  // const [state, setState] = useState<ChatContentType>();
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = createRef() as any;

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  // useEffect(() => {
  //   setState({ chat: props.data, msg: '' });
  //   setIsClient(true);
  // }, []);

  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<{message: string}>({
    defaultValues: {
      message:""
    }
  });

  const handleSubmitForm = async (value: any) => {
    const {message} = value
    if(!data?.roomId ) return;
    let chatClone = [] as Chat[]
    const dataUpdate = {id: me?.id||"" ||"", name: me?.name || ""  ,message: message, createdAt: new Date().toISOString()}
    if(!data?.chats || (data?.chats && data?.chats.length === 0 )){
      chatClone = [dataUpdate]
    }else{ 
      chatClone = data.chats.concat([dataUpdate])
    }
    // chats: [
      // {keyUserName: '', name: ,message: , createdAt: }
    // ]
    console.log(140,chatClone)
    try {
      if(message && data?.roomId){
        await updateDocument("rooms",data?.roomId, {chats: chatClone})
      }
    } catch (error) {
      console.log(error)
    }
    
  };

  const checkTheMessageIsMine = (id: string) =>{
    if(me && me.id === id){
      return true
    }
    return false
  }

  return (
    <div className={cx('main__chatcontent')}>
      <div className={cx('content__header')}>
        <div className={cx('blocks')}>
          <div className={cx('current-chatting-user')}>
            <Avatar
              isOnline="active"
              image={'https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/import/images/naruto02/501%EF%BD%9E600/542/C004.jpg'}
            />
            <p>{user?.name}</p>
          </div>
        </div>

        <div className={cx('blocks')}>
          <div className={cx('settings')}>
          </div>
        </div>
      </div>
      <div className={cx('content__body')}>
        <div className={cx('chat__items')}>
          {data&&data.chats && data.chats.map((chat, i: number) => {
            return (
              <ChatItem
                key={i}
                user={checkTheMessageIsMine(chat.id) ? 'me' : 'other'}
                msg={chat.message}
                image={checkTheMessageIsMine(chat.id) ? "https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/import/images/naruto02/501%EF%BD%9E600/542/C004.jpg": 'https://staticg.sportskeeda.com/editor/2022/07/6da3a-16579565613971.png?w=840'}
                time={formatShortDateTime(chat.createdAt)}
              />
            );
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>
      <Form
        form={form}
        onFinish={handleSubmitForm}
      >
        <div className={cx('content__footer')}>
          <div className={cx('sendNewMessage')}>
            {/* <Form.Item name='picture' style={{ marginBottom: '0' }}>
              <div className={cx('addFiles')}>
                <Upload {...props}>
                  <Button icon={<UploadOutlined />}>Click to Upload</Button>
                </Upload>
              </div>
            </Form.Item> */}
            <Form.Item
              name="message"
              style={{ marginBottom: '0', width: '100%' }}
            >
              <input
                type="text"
                placeholder="Type a message here"
                // onChange={onStateChange}
                // value={state?.msg}
              />
            </Form.Item>
            <Form.Item style={{ marginBottom: '0' }}>
              <button
                type="submit"
                className={cx('btnSendMsg')}
                id="sendMsgBtn"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
                  />
                </svg>
              </button>
            </Form.Item>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ChatContent;
