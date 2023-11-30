import React, { Component, useState, createRef, useEffect, useRef } from 'react';
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
import { FormItem } from 'react-hook-form-antd';

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
  const refContent = useRef<any>(null)
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
    if(!message) return;
    let chatClone = [] as Chat[]
    const dataUpdate = {id: me?.id||"" ||"", name: me?.name || "", avatar: me?.avatar || ""  ,message: message, createdAt: new Date().toISOString()}
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
      reset()
      console.log(97,refContent.current.scrollHeight)
      refContent.current.scrollTop = refContent.current.scrollHeight

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

  // const handleButtonSubmit = () =>{
  //   setValue("message", "");
  //   console.log(97,refContent.current.scrollHeight)
  //   refContent.current.scrollTop = refContent.current.scrollHeight
  // }
  useEffect(()=>{refContent.current.scrollTop = refContent.current.scrollHeight},[refContent.current?.scrollHeight])

  return (
    <div className={cx('main__chatcontent')}>
      <div className={cx('content__header')}>
        <div className={cx('blocks')}>
          <div className={cx('current-chatting-user')}>
            <Avatar
              isOnline="active"
              image={user?.avatar || 'https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/import/images/naruto02/501%EF%BD%9E600/542/C004.jpg'}
            />
            <p>{user?.name}</p>
          </div>
        </div>

        <div className={cx('blocks')}>
          <div className={cx('settings')}>
          </div>
        </div>
      </div>
      <div ref={refContent} className={cx('content__body')}>
        <div className={cx('chat__items')}>
          {data&&data.chats && data.chats.map((chat, i: number) => {
            return (
              <ChatItem
                key={i}
                user={checkTheMessageIsMine(chat.id) ? 'me' : 'other'}
                msg={chat.message}
                image={chat.avatar || "https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/import/images/naruto02/501%EF%BD%9E600/542/C004.jpg"}
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
            <FormItem
              name="message"
              style={{ marginBottom: '0', width: '100%' }}
              control={control}
            >
              <input
                type="text"
                placeholder="Type a message here"
                autoComplete="false"
                // onChange={onStateChange}
                // value={state?.msg}
              />
            </FormItem>
            <div style={{ marginBottom: '0' }}>
              <button
                type="submit"
                className={cx('btnSendMsg')}
                id="sendMsgBtn"
                // onClick={handleButtonSubmit}
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
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default ChatContent;
