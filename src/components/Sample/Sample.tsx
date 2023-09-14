import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Sample.module.scss';

const cx = classNames.bind(styles);

interface SampleProps {}

const Sample: FC<SampleProps> = () => {
  return <div className={cx('wrapper')}>Sample</div>;
};

export default Sample;
