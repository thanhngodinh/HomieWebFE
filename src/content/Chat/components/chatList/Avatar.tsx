import React from 'react';
import styles from './chatList.module.scss';
import classNames from 'classnames/bind';
interface AvatarProps {
  image: string;
  isOnline: any;
  size: "s" | "m" | 'l'
}

const cx = classNames.bind(styles);

const Avatar = (props: AvatarProps) => {
  return (
    <div className={cx("avatar",`avatar-${props.size}`)}>
      <div className={cx('avatar-img')}>
        <img src={props.image} alt="#" />
      </div>
      <span className={`isOnline ${props.isOnline}`}></span>
    </div>
  );
};

export default Avatar;