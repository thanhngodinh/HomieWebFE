import { FC } from 'react';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { GenCurrecy } from '../../utils/func';
import { Avatar } from 'antd';

interface RoommateItemProps {
  id: string;
  img: string;
  name: string;
  costFrom: number;
  costTo: number;
  address: string;
  gender?: string;
}

const RoommateItem: FC<RoommateItemProps> = ({
  id,
  img,
  name,
  address,
  costFrom,
  costTo,
  gender,
}) => {
  return (
    <div className="h-full row-span-1 grid grid-cols-12 py-4">
      <div className="col-span-3 cursor-pointer">
        <Link href={id}>
          <Avatar src={img} />
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
        <p className="text-base row-span-1">
          Giá thuê: {GenCurrecy(costFrom)} - {GenCurrecy(costTo)}
        </p>
        <p className="text-base row-span-1">Giới tính: {gender}</p>
      </div>
      <div className="row-span-2 text-right cursor-pointer">
        <FavoriteIcon fontSize="medium" />
      </div>
    </div>
  );
};

export default RoommateItem;
