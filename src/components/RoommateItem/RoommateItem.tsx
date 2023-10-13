import { FC } from 'react';
import Link from 'next/link';
import { GenCurrecy } from '../../utils/func';
import { Avatar } from 'antd';

interface RoommateItemProps {
  id: string;
  img: string;
  name: string;
  costFrom: number;
  costTo: number;
  province: string;
  district: string[];
  gender?: string;
}

const RoommateItem: FC<RoommateItemProps> = (props) => {
  return (
    <div className="h-full row-span-1 grid grid-cols-12 py-4">
      <div className="col-span-3 cursor-pointer">
        <Link href={props.id}>
          <Avatar src={props.img} />
        </Link>
      </div>
      <div className="col-span-7 px-4 grid grid-rows-6">
        <Link href={props.id}>
          <h2 className="row-span-1 text-3xl text-primary light cursor-pointer">
            {props.name}
          </h2>
        </Link>
        <div className="row-span-1 flex items-center">
          <hr className="w-1/5" />
        </div>
        <p className="text-base row-span-1">Tỉnh: {props.province}</p>
        <p className="text-base row-span-1">Quận/Huyện: {props.district}</p>
        <p className="text-base row-span-1">
          Giá thuê: {GenCurrecy(props.costFrom)} - {GenCurrecy(props.costTo)}
        </p>
        <p className="text-base row-span-1">Giới tính: {props.gender}</p>
      </div>
    </div>
  );
};

export default RoommateItem;
