import React, { Component } from 'react';

import styles from './userProfile.module.scss';
import classNames from 'classnames/bind';
import { User } from '../../../../models';

const cx = classNames.bind(styles);

type UserProfileProps = {
  info?: User
}

const UserProfile = ({info}: UserProfileProps) => {
  const toggleInfo = (e: any) => {
    e.target.parentNode.classList.toggle('open');
  };

  return (
    <div className={cx('main__userprofile')}>
      <div className={cx('profile__card')}>
        <div className={cx('profile__image')}>
          <img src="https://cmsapi-frontend.naruto-official.com/site/api/naruto/Image/get?path=/naruto/import/images/naruto02/501%EF%BD%9E600/542/C004.jpg" />
        </div>
        <h4>{info?.name}</h4>
        <p>{info?.email}</p>
        <p>{info?.phone}</p>
      </div>
      {/* <div className={cx('profile__card')}>
        <div className={cx('card__header')} onClick={toggleInfo}>
          <h4>Information</h4>
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
              d="M19.5 8.25l-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
        <div className={cx('card__content')}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
          ultrices urna a imperdiet egestas. Donec in magna quis ligula
        </div>
      </div> */}
    </div>
  );
};

export default UserProfile;
