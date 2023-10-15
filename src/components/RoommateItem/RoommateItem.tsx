import { FC } from 'react';
import Link from 'next/link';
import { GenCurrecy } from '../../utils/func';
import { Avatar, Button, Tag } from 'antd';

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
    <>
      <div className="row-span-1 grid grid-cols-12 py-4 bg-slate-100 rounded-2xl px-8">
        <div className="col-span-2 cursor-pointer my-auto">
          <Link href={'roommates/' + props.id}>
            <Avatar
              size={{ xs: 40, sm: 64, md: 80, lg: 100, xl: 160, xxl: 200 }}
              src={props.img}
              shape={'circle'}
            />
          </Link>
        </div>
        <div className="col-span-7 px-4 grid grid-rows-6">
          <Link href={'roommates/' + props.id}>
            <h2 className="row-span-1 text-3xl text-purple light cursor-pointer">
              {props.name}
            </h2>
          </Link>
          <div className="row-span-1 flex items-center">
            <hr className="w-full" />
          </div>
          <div className="text-base row-span-1">
            <span className="font-semibold">Tỉnh: </span>
            <span>{props.province}</span>
          </div>
          <div className="text-base row-span-1">
            <span className="font-semibold">Quận/Huyện: </span>
            {props.district.map((d) => {
              return <Tag key={d}>{d}</Tag>;
            })}
          </div>
          <div className="text-base row-span-1">
            <span className="font-semibold">Giá thuê: </span>
            <span>
              {GenCurrecy(props.costFrom)} - {GenCurrecy(props.costTo)}
            </span>
          </div>
          <div className="text-base row-span-1">
            <span className="font-semibold">Giới tính: </span>
            <span>{props.gender == "M"? "Nam": "Nữ"}</span>
          </div>
        </div>
        <div className="col-span-1 m-auto">
          <Link href="/chat">
            <button
              type="button"
              className=" button button__fill button__fill-medium text__normal"
            >
              Chat
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default RoommateItem;
