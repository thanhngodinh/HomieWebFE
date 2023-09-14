import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Sample.module.scss';

const cx = classNames.bind(styles);

interface ManagePost {}

const Sample: FC<ManagePost> = () => {
  return <div className={cx('wrapper')}></div>;
};

export default Sample;
