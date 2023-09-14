import { FC } from 'react';
import HostelItem from '../HostelItem';

interface HostelListProps {
  title?: string;
}

const data = [
  {
    id: 'hostel/1',
    img: 'https://tuvannhadep.com.vn/uploads/images/hinh-anh-nha-dep-1.jpg',
    name: 'Tìm bạn ở ghép',
    size: 3,
    desc: 'Wifi · Có hầm gửi xe',
  },
  {
    id: 'hostel/2',
    img: 'https://tuvannhadep.com.vn/uploads/images/hinh-anh-nha-dep-1.jpg',
    name: 'Tìm bạn ở ghép',
    size: 3,
    desc: 'Wifi · Có hầm gửi xe',
  },
  {
    id: 'hostel/3',
    img: 'https://tuvannhadep.com.vn/uploads/images/hinh-anh-nha-dep-1.jpg',
    name: 'Tìm bạn ở ghép',
    size: 3,
    desc: 'Wifi · Có hầm gửi xe',
  },
];

const HostelList: FC<HostelListProps> = ({ title }) => {
  return (
    <div className="suggest-room mt-20 w-4/5 mx-auto">
      {title && <h1 className="text-4xl mb-5">{title}</h1>}
      <hr />
      <div className="grid grid-rows-3 mt-6">
        {data.map((item, index) => {
          return (<HostelItem
            id={item.id}
            name={item.name}
            img={item.img}
            size={item.size}
            desc={item.desc}
          />);
        })}
      </div>
    </div>
  );
};

export default HostelList;
