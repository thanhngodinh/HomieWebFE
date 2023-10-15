import { FC, useEffect, useState } from 'react';
import HostelItem from '../HostelItem';
import { Hostel } from '../../models/hostel';
import { GenAddress } from '../../utils/func';

interface HostelListProps {
  title?: string;
  hostels: Hostel[];
}

const HostelList: FC<HostelListProps> = ({ title, hostels }) => {
  const [token, setToken] = useState('');
  useEffect(() => {
    let value = localStorage.getItem('token') || '';
    setToken(value);
  }, []);
  return (
    <div className="mt-20 w-4/5 mx-auto">
      {title && <h1 className="text-4xl mb-5">{title}</h1>}
      <hr />
      <div className="grid grid-rows-3 mt-6 gap-4">
        {hostels?.map((item, index) => {
          return (
            <HostelItem
              id={item.id}
              name={item.name}
              img={item.imageUrl[0]}
              size={item.capacity}
              address={GenAddress(
                item.street,
                item.ward,
                item.district,
                item.province
              )}
              cost={item.cost}
              isLiked={item.isLiked}
              token={token}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HostelList;
