import React, { Component } from 'react';
import Avatar from './Avatar';
import styles from './chatList.module.scss';
import classNames from 'classnames/bind';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

interface ChatListItemsProps {
  animationDelay: any;
  active: any;
  image: string;
  isOnline: any;
  name: string;
  lastMessage?: string;
  roomId?:string;
}
const ChatListItems = (props: ChatListItemsProps) => {
  const router = useRouter();
  // const selectChat = (e: any) => {
  //   for (
  //     let index = 0;
  //     index < e.currentTarget.parentNode.children.length;
  //     index++
  //   ) {
  //     e.currentTarget.parentNode.children[index].classList.remove('active');
  //   }
  //   e.currentTarget.classList.add('active');
  // };

  return (
    <div
      style={{ animationDelay: `0.${props.animationDelay}s` }}
      onClick={() => router.push(`/chat/${props.roomId || ""}`)}
      className={`${cx('chatlist__item')} ${props.active ? props.active : ''} `}
    >
      <Avatar
        image={
          props.image
            ? props.image
            : 'https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/import/images/naruto02/501%EF%BD%9E600/542/C004.jpg'
        }
        isOnline={props.isOnline}
      />

      <div className={cx('userMeta')}>
        <p>{props.name}</p>
        <span className={cx('activeTime')}>{props.lastMessage || ""}</span>
      </div>
    </div>
  );
};

export default ChatListItems;
