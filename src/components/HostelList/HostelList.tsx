import { FC } from 'react';
import HostelItem from '../HostelItem';
import { Hostel } from '../../models/hostel';

interface HostelListProps {
  title?: string;
  hostels: Hostel[];
}

const HostelList: FC<HostelListProps> = ({ title, hostels }) => {
  return (
    <div className="suggest-room mt-20 w-4/5 mx-auto">
      {title && <h1 className="text-4xl mb-5">{title}</h1>}
      <hr />
      <div className="grid grid-rows-3 mt-6">
        {hostels?.map((item, index) => {
          return (
            <HostelItem
              id={'hostel/' + item.id}
              name={item.name}
              img={
                'https://tuvannhadep.com.vn/uploads/images/hinh-anh-nha-dep-1.jpg'
              }
              size={item.capacity}
              desc={item.description}
            />
          );
        })}
      </div>
    </div>
  );
};

export default HostelList;
