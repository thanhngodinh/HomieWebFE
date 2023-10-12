import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { getHostels, selectHostels } from '../../redux/hostel/slice';
import RoommateItem from '../../components/RoommateItem';
import { GenAddress } from '../../utils/func';

interface RoommateListProps {}

const RoommateList: FC<RoommateListProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, total, loading, error } = useSelector(selectHostels);

  useEffect(() => {
    dispatch(getHostels());
  }, [dispatch]);

  return (
    <div className="suggest-room mt-20 w-4/5 mx-auto">
      <hr />
      <div className="grid grid-rows-3 mt-6">
        {/* {list?.map((item, index) => {
          return (
            <RoommateItem
              id={'hostel/' + item.id}
              name={item.name}
              img={item.avatar}
              address={GenAddress(
                item.street,
                item.ward,
                item.district,
                item.province
              )}
              costFrom={1500000}
              costTo={2500000}
              gender='Nam'
            />
          );
        })} */}
      </div>
    </div>
  );
};

export default RoommateList;
