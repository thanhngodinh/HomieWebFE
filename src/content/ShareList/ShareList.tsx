import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './ShareList.module.scss';

const cx = classNames.bind(styles);

interface ShareListProps {}

const ShareList: FC<ShareListProps> = () => {
  return <div className={cx('wrapper')}></div>;
};

export default ShareList;
