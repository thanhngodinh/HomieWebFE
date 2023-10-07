import { FC } from 'react';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';

export interface SuggestItemBasicProps {
  link: string;
  img?: string;
  title?: string;
  address?: string;
  cost?: number;
}

const SuggestItemBasic: FC<SuggestItemBasicProps> = (props) => {
  return (
    <Link href={props.link}>
      <div className="text-left text-xl cursor-pointer">
        <img className="rounded h-72 w-full" src={props.img} />
        <p className="font-bold text-base mt-1">{props.title}</p>
        <p className="text-base mt-1 text-gray-500">{props.address}</p>
        <p className="text-base mt-1">
          {props.cost?.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&.')}
        </p>
      </div>
    </Link>
  );
};

SuggestItemBasic.defaultProps = {
  img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
  link: '/',
  title: 'Ha Noi',
};

export default SuggestItemBasic;
