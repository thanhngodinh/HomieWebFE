import { FC, useState } from 'react';
import Link from 'next/link';
import { GenCurrecy } from '../../utils/func';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { likePost } from '../../redux/hostel/slice';
import { Checkbox } from 'antd';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { formatShortDate } from '../../utils/date';

interface HostelItemProps {
  id: string;
  img: string;
  name: string;
  size?: number;
  cost: number;
  createdAt?: string;
  address: string;
  type: string;
  avgRate: number;
  handleCompare?: (checked: boolean, id: string) => void;
  isCompareChecked?: boolean;
  removeAction?: boolean;
}

const HostelItem: FC<HostelItemProps> = (props) => {
  return (
    <div className="relative rounded-lg grid phone:grid-rows-2 sm:grid-rows-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-6 xxl:grid-cols-6 content-center  y-4 bg-slate-100 rounded-xxl px-8 md:h-72 sm:h-96 phone:h-[26rem] mb-3">
      <div className=" cursor-pointer m-auto">
        <Link href={'/posts/' + props.id}>
          <div className="w-[160px] h-[150px]">
            <img className="w-full h-full rounded-xl" src={props.img} />
          </div>
        </Link>
      </div>
      <div className="sm:col-span-2 md:col-span- lg:col-span-4 xl:col-span-4 xxl:col-span-4 sm:pl-16 phone:pl-0  my-auto">
        <Link href={'/posts/' + props.id}>
          <h2 className="phone:text-base sm:text-xl  xl:text-2xl xxl:text-2xl mb-2 text-primary light cursor-pointer my-auto">
            {props.name}
          </h2>
        </Link>
        <div className="row-span-1 mb-1 flex items-center">
          <hr className="w-full" />
        </div>
        <div className="text-base row-span-1 mb-1">
          <div className="text-base row-span-1 mb-1 ">
            <span className="font-semibold">Loại nhà: </span>
            <span>{props.type}</span>
          </div>
          <span className="font-semibold">Địa chỉ: </span>
          <span className="phone:text-sm sm:text-md">{props.address}</span>
        </div>
        <div className="text-base row-span-1 mb-1 ">
          <span className="font-semibold">Giá thuê: </span>
          <span>{GenCurrecy(props.cost)}</span>
        </div>
        <div className="text-base row-span-1 mb-1 ">
          <span className="font-semibold">Ngày đăng: </span>
          <span>{formatShortDate(props.createdAt)}</span>
        </div>
      </div>

      {props.removeAction ? (
        <></>
      ) : (
        <div className="h-full flex flex-col justify-center items-center col-span-1 text-right mb-6 m-auto phone:absolute phone:block phone:h-auto phone:right-0 phone:mr-3 sm:absolute sm:block sm:h-auto sm:right-0 sm:mr-3 md:flex md:h-full md:relative ">
          {props.avgRate == 0 ? (
            <div className="font-semibold text-xs my-1">Chưa có đánh giá</div>
          ) : (
            <div>
              <span className="font-semibold ">{props.avgRate + ' '}</span>
              <FontAwesomeIcon
                size={'sm'}
                icon={faStar}
                style={{ color: '#FADB14' }}
              />
            </div>
          )}

          <div className="phone:absolute sm:relative phone:top-[380px] phone:right-[0px] sm:bottom-0 sm:top-0 sm:right-0 phone:w-[100px] sm:w-auto">
            <Checkbox
              checked={props.isCompareChecked}
              onChange={(e) =>
                props.handleCompare &&
                props.handleCompare(e.target.checked, props.id)
              }
            >
              So sánh
            </Checkbox>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelItem;
