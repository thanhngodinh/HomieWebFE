import { FC, ReactNode } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames/bind';
import styles from './BaseLayout.module.scss';

const cx = classNames.bind(styles);

interface BaseLayoutProps {
  children?: ReactNode;
}

const BaseLayout: FC<BaseLayoutProps> = ({ children }) => {
  return <div className={cx('wrapper')}>{children}</div>;
};

BaseLayout.propTypes = {
  children: PropTypes.node as any,
};

export default BaseLayout;
