import { Rate as AntdRate } from 'antd';
import { FC } from 'react';
import { Rate } from '../../models/rate';
import { formatShortDate } from '../../utils/date';

interface ReviewProps {
  rate: Rate;
}

const Review: FC<ReviewProps> = ({ rate }) => {
  return (
    <>
      <div className="mt-0  py-7">
        <a className="rounded-full h-[40px] w-[40px] object-contain outline-0 ">
          <img
            className="float-left mr-1 h-[40px] w-[40px] rounded-full object-cover"
            src={rate.authorAvatar}
            alt=""
          />
        </a>
        <div className="mt-0 pl-[47px] relative align-middle">
          <div className="font-bold text-sm pr-[6px]">{rate.authorName}</div>
          <div className=" text-sm pr-[6px]">
            {' '}
            <AntdRate
              className="mr-2"
              style={{ fontSize: '12px' }}
              disabled
              defaultValue={2}
            />
          </div>
          <div className="align-top">
            <div className="inline-block pb-2">
              <span className="mr-2 w-[68px] h-[12px]">
                <span className="text-sm">
                  {'Đăng ngày: ' + formatShortDate(rate.createdAt)}
                </span>
                {/* <p className="text-xs">4</p>
                <img
                  src="data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.44 19'><polygon fill='%23fdd663' points='10,15.27 16.18,19 14.54,11.97 20,7.24 12.81,6.63 10,0 7.19,6.63 0,7.24 5.46,11.97 3.82,19'/></svg>"
                  alt=""
                /> */}
              </span>
            </div>
            <div className="text-black text-sm">{rate.comment}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Review;
