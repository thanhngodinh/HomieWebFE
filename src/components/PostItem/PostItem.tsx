import { FC } from 'react';
import Link from 'next/link';
import FavoriteIcon from '@mui/icons-material/Favorite';
import StatusBox from '../Status/StatusBox';
import { formatShortDate } from '../../utils/date';
import { PostTitleMapping } from '../../utils/common';

interface PostItemProps {
  id?: string;
  img?: string;
  name?: string;
  code?: string;
  startDate?: string | Date;
  endDate?: string | Date;
  status?: 'A' | 'I' | 'W';
}

const PostItem: FC<PostItemProps> = ({
  id,
  img,
  name,
  code,
  startDate,
  endDate,
  status,
}) => {
  // console.log(new Date().toISOString());
  return (
    <div className="h-full w-full grid grid-cols-4 gap-4 text-base">
      <div className="w-full h-[200px]">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={img}
          alt="postitem"
        />
      </div>
      <div className="col-span-2 ">
        <div className="text-lg mb-12">{name}</div>
        <div className="flex justify-start gap-12 text-center">
          <div className="text-center">
            <div className="text__title">Trạng thái</div>
            <StatusBox
              status={status}
              title={PostTitleMapping.get(status || '')}
            ></StatusBox>
          </div>
          <div className="text-center">
            <div className="text__title">Mã tin</div>
            <div className="text__main-color p-2">{code}</div>
          </div>
          <div className="text-center">
            <div className="text__title">Ngày đăng</div>
            <div className="text__main-color p-2">
              {formatShortDate(startDate)}
            </div>
          </div>
          <div className="text-center">
            <div className="text__title">Ngày hết hạn</div>
            <div className="text__main-color p-2">
              {formatShortDate(endDate)}
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-4 items-end m-auto">
        {/* Chi Tiết */}
        <Link href={'/posts/' + id}>
          <button className="button button__border flex justify-center items-center">
            <svg
              className="inline-block mr-2"
              xmlns="http://www.w3.org/2000/svg"
              height="24"
              viewBox="0 -960 960 960"
              width="24"
              fill="currentColor "
            >
              <path d="M480-280q17 0 28.5-11.5T520-320q0-17-11.5-28.5T480-360q-17 0-28.5 11.5T440-320q0 17 11.5 28.5T480-280Zm-40-160h80v-240h-80v240Zm40 360q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-80q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Zm0-320Z" />
            </svg>
            <span>Chi tiết</span>
          </button>
        </Link>
        {/* Sửa tin */}
        <button className="button button__border flex justify-center items-center">
          <svg
            className="inline-block mr-2"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="currentColor "
          >
            <path d="M80 0v-160h800V0H80Zm160-320h56l312-311-29-29-28-28-311 312v56Zm-80 80v-170l448-447q11-11 25.5-17t30.5-6q16 0 31 6t27 18l55 56q12 11 17.5 26t5.5 31q0 15-5.5 29.5T777-687L330-240H160Zm560-504-56-56 56 56ZM608-631l-29-29-28-28 57 57Z" />
          </svg>
          <span>Sửa tin</span>
        </button>
        {/* Xóa tin */}
        <button className="button button__border flex justify-center items-center">
          <svg
            className="inline-block mr-2"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="currentColor "
          >
            <path d="M280-120q-33 0-56.5-23.5T200-200v-520h-40v-80h200v-40h240v40h200v80h-40v520q0 33-23.5 56.5T680-120H280Zm400-600H280v520h400v-520ZM360-280h80v-360h-80v360Zm160 0h80v-360h-80v360ZM280-720v520-520Z" />
          </svg>
          <span>Xóa tin</span>
        </button>
        {/* Khác */}
        {/* <button className="button button__border flex justify-center items-center">
          <svg
            className="inline-block mr-2"
            xmlns="http://www.w3.org/2000/svg"
            height="24"
            viewBox="0 -960 960 960"
            width="24"
            fill="currentColor "
          >
            <path d="M240-400q-33 0-56.5-23.5T160-480q0-33 23.5-56.5T240-560q33 0 56.5 23.5T320-480q0 33-23.5 56.5T240-400Zm240 0q-33 0-56.5-23.5T400-480q0-33 23.5-56.5T480-560q33 0 56.5 23.5T560-480q0 33-23.5 56.5T480-400Zm240 0q-33 0-56.5-23.5T640-480q0-33 23.5-56.5T720-560q33 0 56.5 23.5T800-480q0 33-23.5 56.5T720-400Z" />
          </svg>
          <span>Khác</span>
        </button> */}
      </div>
    </div>
  );
};

PostItem.defaultProps = {
  img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
  name: 'Cần tìm bạn ở ghép chung phòng quận 4',
  code: '2022101',
  startDate: '2023-09-29T19:57:50.468Z',
  endDate: '2023-09-29T19:57:50.468Z',
  status: 'A',
};

export default PostItem;
