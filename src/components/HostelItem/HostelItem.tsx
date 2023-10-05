import { FC } from 'react';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';

interface HostelItemProps {
  id: string;
  img?: string;
  name?: string;
  size?: number;
  cost?: number;
  address?: string;
}

const HostelItem: FC<HostelItemProps> = ({
  id,
  img,
  name,
  size,
  address,
  cost,
}) => {
  return (
    <div className="h-full row-span-1 grid grid-cols-12 py-4">
      <div className="col-span-3 cursor-pointer">
        <Link href={id}>
          <img className="w-full rounded-xl" src={img} />
        </Link>
      </div>
      <div className="col-span-7 px-4 grid grid-rows-6">
        <Link href={id}>
          <h2 className="row-span-1 text-3xl text-primary light cursor-pointer">
            {name}
          </h2>
        </Link>
        <div className="row-span-1 flex items-center">
          <hr className="w-1/5" />
        </div>
        <p className="text-base row-span-1">Địa chỉ: {address}</p>
        <p className="text-base row-span-1">Giá thuê: {cost}</p>
        <p className="text-base row-span-1">Phòng {size} người</p>
      </div>
      <div className="row-span-2 text-right cursor-pointer">
        <FavoriteIcon fontSize="medium" />
      </div>
    </div>
  );
};

export default HostelItem;
