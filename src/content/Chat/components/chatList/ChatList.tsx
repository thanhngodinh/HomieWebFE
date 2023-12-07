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
  me?: User;
}
const image = 'https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/import/images/naruto02/501%EF%BD%9E600/542/C004.jpg'
const ChatList: FC<ChatListProps> = ({rooms, user,me}) =>{
  const [valueSearch, setValueSearch] = React.useState<string>("")
  const [resultsSearch, setResultsSearch] = React.useState<Room[]>([])
  const [isSearch , setIsSearch] = React.useState(false)

  const onSearch = (rooms: Room[], room: string) =>{
    if(!rooms || (rooms && rooms.length <0)) return;
    if(!room) {setIsSearch(false);return;}
    const rs = rooms.filter((r) => (r.keyUserName && r.keyUserName !== me?.name  && r.keyUserName.includes(room))  || (r.name && r.name !== me?.name && r.name.includes(room)))
    setResultsSearch(rs)
    console.log(rooms,rs,valueSearch)
    setIsSearch(true)
  }

  const onChangeInputSearch = (e: any) =>{
    setValueSearch(e.target.value)
    if(!e.target.value){
      setIsSearch(false)
    }
  }

  return (
    <div className={cx('main__chatlist')}>
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
          <input type="text" placeholder="Search Here" value={valueSearch} onChange={onChangeInputSearch}  required />
          <button className={cx('search-btn')} onClick={() => onSearch(rooms,valueSearch)}>
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
        {rooms  && (isSearch || resultsSearch && resultsSearch.length > 0 && resultsSearch.length < rooms.length? resultsSearch  :rooms).map((item, index) => {
          return (
            <ChatListItems
              lastMessage={item.chats && item.chats[item.chats?.length-1].message}
              name={user?.id === item.keyUserId ? item.keyUserName : item.name}
              key={item.id}
              roomId={item.roomId}
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