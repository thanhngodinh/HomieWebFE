import React, { Component } from 'react';
import styles from './chatContent.module.scss';
import Avatar from '../chatList/Avatar';
import classNames from 'classnames/bind';

const cx = classNames.bind(styles);

type ChatItemProps = {
  user: any;
  msg: any;
  image: any;
  time: any;
};

const ChatItem = (props: ChatItemProps) => {
  return (
    <div
      style={{ animationDelay: `0.8s` }}
      className={cx(`chat__item`, props.user ? props.user : '')}
    >
      <div className={cx('chat__item__content')}>
        <div className={cx('chat__msg')}>{props.msg}</div>
        <div className={cx('chat__meta')}>
          <span>{props.time}</span>
          {/* <span>Seen 1.03PM</span> */}
        </div>
      </div>
      <Avatar size="s" isOnline="active" image={props.image} />
    </div>
  );
};

export default ChatItem;