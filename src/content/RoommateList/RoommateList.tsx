import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getHostels, selectHostels } from '../../redux/hostel/slice';
import RoommateItem from '../../components/RoommateItem';
import { GenAddress } from '../../utils/func';
import { searchRoommates, selectUsers } from '../../redux/user/slice';

interface RoommateListProps {}

const RoommateList: FC<RoommateListProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { roommates, total, loading, error } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(searchRoommates());
  }, [dispatch]);

  return (
    <div className="suggest-room mt-20 w-4/5 mx-auto rounded">
      <div className="grid grid-rows-3 gap-4">
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
