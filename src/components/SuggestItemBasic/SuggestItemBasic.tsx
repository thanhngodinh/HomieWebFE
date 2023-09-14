import { FC } from 'react';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';

export interface SuggestItemBasicProps {
  img?: string;
  title?: string;
  address?: string;
  cost?: number;
}

const SuggestItemBasic: FC<SuggestItemBasicProps> = (props) => {
  return (
    <div className="text-left text-xl">
      <img className="rounded h-72 w-full" src={props.img} />
      <p className="font-bold text-base mt-1">{props.title}</p>
      <p className="text-base mt-1 text-gray-500">{props.address}</p>
      <p className="text-base mt-1">
        {props.cost?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}
      </p>
    </div>
  );
};

SuggestItemBasic.defaultProps = {
  img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
  title: 'Ha Noi',
};

export default SuggestItemBasic;
