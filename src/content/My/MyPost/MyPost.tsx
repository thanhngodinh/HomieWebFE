import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './MyPost.module.scss';

const cx = classNames.bind(styles);

interface MyPostProps {}

const MyPost: FC<MyPostProps> = () => {
  return <div className={cx('wrapper')}>MyPost</div>;
};

export default MyPost;
