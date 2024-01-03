import { FC, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './HostelPostList.module.scss';
import HostelList from '../../components/HostelList';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { elasticSearch, selectHostels } from '../../redux/hostel/slice';

const cx = classNames.bind(styles);

interface HostelListProps {}

const HostelPostList: FC<HostelListProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, total, loading, error } = useSelector(selectHostels);

  useEffect(() => {
    dispatch(elasticSearch());
  }, [dispatch]);

  return <HostelList hostels={list} />;
};

export default HostelPostList;
