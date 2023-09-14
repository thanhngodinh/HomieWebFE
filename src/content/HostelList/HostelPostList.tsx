import { FC, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HostelPostList.module.scss';
import HostelList from '../../components/HostelList';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { fetchHostels, hostelsSelector, fetch } from '../../features/hostel';
import { Hostel } from '../../models/hostel';
import { useDispatch } from 'react-redux';

const cx = classNames.bind(styles);

interface HostelListProps {}

const HostelPostList: FC<HostelListProps> = () => {
  const dispatch = useDispatch();
  const hostels: Hostel[] = useAppSelector(hostelsSelector) || [];

  useEffect(() => {
    dispatch(fetchHostels);
  }, [dispatch]);

  console.log(hostels);

  return <HostelList title="list" hostels={hostels} />;
};

export default HostelPostList;
