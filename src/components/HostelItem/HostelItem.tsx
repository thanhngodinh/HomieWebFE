import { FC, useState } from 'react';
import Link from 'next/link';
import { GenCurrecy } from '../../utils/func';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { likePost } from '../../redux/hostel/slice';

interface HostelItemProps {
  id: string;
  img: string;
  name: string;
  size?: number;
  cost: number;
  address: string;
  isLiked: boolean;
  token: string;
}

const HostelItem: FC<HostelItemProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();

  const [isLiked, setIsLiked] = useState(props.isLiked);

  const onLikeChange = () => {
    setIsLiked(!isLiked);
    dispatch(likePost(props.id));
  };

  return (
    <div className="grid grid-cols-12 py-4 bg-slate-100 rounded-2xl px-8">
      <div className="col-span-3 cursor-pointer m-auto">
        <Link href={'posts/' + props.id}>
          <img className="w-full rounded-xl" src={props.img} />
        </Link>
      </div>
      <div className="col-span-8 px-4 grid grid-rows-5 m-auto">
        <Link href={'posts/' + props.id}>
          <h2 className="text-3xl text-primary light cursor-pointer my-auto">
            {props.name}
          </h2>
        </Link>
        <div className="row-span-1 flex items-center">
          <hr className="w-full" />
        </div>
        <div className="text-base row-span-1">
          <span className="font-semibold">Địa chỉ: </span>
          <span>{props.address}</span>
        </div>
        <div className="text-base row-span-1">
          <span className="font-semibold">Giá thuê: </span>
          <span>{GenCurrecy(props.cost)}</span>
        </div>
        <p className="text-base row-span-1">Phòng {props.size} người</p>
      </div>
      <div className="col-span-1 text-right cursor-pointer m-auto">
        {props.token ? (
          isLiked ? (
            <FontAwesomeIcon
              icon={'heart'}
              style={{ color: '#eb0a0a' }}
              onClick={onLikeChange}
            />
          ) : (
            <FontAwesomeIcon icon={['far', 'heart']} onClick={onLikeChange} />
          )
        ) : (
          <>
            <Link href={'/login'}>
              <FontAwesomeIcon icon={['far', 'heart']} />
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default HostelItem;
