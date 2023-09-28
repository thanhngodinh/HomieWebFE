import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './My.module.scss';

const cx = classNames.bind(styles);

interface MyProps {}

const My: FC<MyProps> = () => {
  return <div className={cx('wrapper')}>My</div>;
};

export default My;
