import React, { Component, FC } from 'react';
import styles from './chatList.module.scss';
import ChatListItems from './ChatListItems';
import classNames from 'classnames/bind';
import { Room } from '../../Chat';
import { User } from '../../../../models';

const cx = classNames.bind(styles);
interface  ChatListProps  {
  rooms: Room[];
  user?: User;
}
const image = 'https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/import/images/naruto02/501%EF%BD%9E600/542/C004.jpg'
const ChatList: FC<ChatListProps> = ({rooms, user}) =>{

  return (
    <div className={cx('main__chatlist')}>
      {/* <button className={cx('chatList_btn')}>
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
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>

        <span>New conversation</span>
      </button> */}
      <div className={cx('chatlist__heading')}>
        <h2>Chats</h2>
        <button className={cx('btn-nobg')}>
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
              d="M6.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM12.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0zM18.75 12a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
            />
          </svg>
        </button>
      </div>
      <div className={cx('chatList__search')}>
        <div className={cx('search_wrap')}>
          <input type="text" placeholder="Search Here" required />
          <button className={cx('search-btn')}>
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
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
          </button>
        </div>
      </div>
      <div className={cx('chatlist__items')}>
        {rooms.map((item, index) => {
          return (
            <ChatListItems
              lastMessage={item.chats && item.chats[item.chats?.length-1].message}
              name={user?.id === item.keyUserId ? item.keyUserName : item.name}
              key={item.id}
              animationDelay={index + 1}
              active={''}
              isOnline={''}
              image={user?.id === item.keyUserId ? item.keyUserAvatar : item.avatar}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;
