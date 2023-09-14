import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';

const cx = classNames.bind(styles);

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  return <div className={cx('wrapper')}></div>;
};

export default Profile;
