import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import RoommateItem from '../../components/RoommateItem';
import { GenAddress } from '../../utils/func';
import { searchRoommates, selectUsers } from '../../redux/user/slice';
import { Button } from 'antd';
import Link from 'next/link';

interface RoommateListProps {}

const RoommateList: FC<RoommateListProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { roommates, total, loading, error } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(searchRoommates());
  }, [dispatch]);

  return (
    <div className="suggest-room mt-20 w-4/5 mx-auto rounded">
      <div className="text-right">
        <Link href="/my/profile">
          <Button className="button button__fill button__fill-large">
            Tham gia tìm bạn
          </Button>
        </Link>
      </div>

      <div className="mt-6 relative">
        {roommates?.map((item: any, i: number) => {
          return (
            <RoommateItem
              key={i}
              id={item.id}
              name={item.name}
              img={item.avatar}
              province={item.province}
              district={item.district}
              costFrom={1500000}
              costTo={2500000}
              gender={item.gender}
            />
          );
        })}
      </div>
    </div>
  );
};

export default RoommateList;
