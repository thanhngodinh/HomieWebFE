import { FC, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Carousel from 'react-material-ui-carousel';
import { Carousel as Carousel2 } from 'antd';
import React from 'react';
import SuggestItemBasic from '../../../components/SuggestItemBasic';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import {
  getHostelById,
  getHostelSuggest,
  selectHostels,
} from '../../../redux/hostel/slice';
import {
  getUtilitiess,
  selectUtilitiess,
} from '../../../redux/utilities/slice';
import { useRouter } from 'next/router';
// import { useParams } from 'next/navigation';
import { GenAddress, GenCurrecy, GetUtility } from '../../../utils/func';
const cx = classNames.bind(styles);

interface HostelDetailProps {
  author: AuthorInfo;
}

interface AuthorInfo {
  avatar: string;
  name: string;
  phone: string;
  link: string;
}

const HostelDetail: FC<HostelDetailProps> = (props) => {
  const router = useRouter();
  // const id = router.asPath.substring(router.pathname.lastIndexOf('/') + 1);
  const id = router.query.id as string;
  console.log(router, id);

  const dispatch = useDispatch<AppDispatch>();
  const { hostel, listSuggest, loading, error } = useSelector(selectHostels);
  const { listUtilities } = useSelector(selectUtilitiess);

  useEffect(() => {
    if (id) {
      dispatch(getHostelById(id));
      dispatch(getUtilitiess());
      dispatch(getHostelSuggest());
    }
  }, [dispatch, id]);

  return (
    <div className="hostel-detail w-4/5 mx-auto">
      <div className="bg-slate-50 rounded-lg">
        {hostel?.imageUrl && (
          <Carousel
            autoPlay={true}
            stopAutoPlayOnHover={true}
            animation={'slide'}
          >
            {[
              ...hostel?.imageUrl?.map((image: string, i: number) => {
                return (
                  <img
                    className="h-96 object-cover mx-auto"
                    src={image}
                    key={i}
                  />
                );
              }),
            ]}
          </Carousel>
        )}
      </div>
      <div className="my-5 text-lg">{hostel?.name}</div>
      <hr />
      <div className="h-auto w-full grid grid-cols-3 gap-4 divide-y divide-gray-200">
        <div className="col-span-2">
          <div className="my-5">
            <div>
              <p className="text-gray-500 text-sm">Địa chỉ</p>
              <p className="text-sm">
                {GenAddress(
                  hostel?.street,
                  hostel?.ward,
                  hostel?.district,
                  hostel?.province
                )}
              </p>
            </div>
            <div className="mt-2 grid grid-cols-4">
              {hostel?.area && (
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">Diện tích</p>
                  <p className="text-sm">{`${hostel?.area} mét vuông`}</p>
                </div>
              )}
              {hostel?.capacity && (
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">Dành cho</p>
                  <p className="text-sm">{`${hostel?.capacity - 1} - ${
                    hostel?.capacity + 1
                  } người`}</p>
                </div>
              )}
            </div>

            <div className="mt-2">
              <p className="text-gray-500 text-sm">Giá phòng</p>
              <p className="text-sm">{GenCurrecy(hostel?.cost)}</p>
            </div>
            <div className="mt-2">
              <p className="text-gray-500 text-sm">Tiền cọc</p>
              <p className="text-sm">{GenCurrecy(hostel?.deposit)}</p>
            </div>
            <div className="mt-2 grid grid-cols-4">
              {hostel?.electricityPrice && (
                <div>
                  <p className="text-gray-500 text-sm">Tiền điện</p>
                  <p className="text-sm">
                    {GenCurrecy(hostel?.electricityPrice)}
                  </p>
                </div>
              )}
              {hostel?.waterPrice && (
                <div>
                  <p className="text-gray-500 text-sm">Tiền nước</p>
                  <p className="text-sm">{GenCurrecy(hostel?.waterPrice)}</p>
                </div>
              )}
              {hostel?.parkingPrice && (
                <div>
                  <p className="text-gray-500 text-sm">Tiền xe</p>
                  <p className="text-sm">{GenCurrecy(hostel?.parkingPrice)}</p>
                </div>
              )}

              {hostel?.servicePrice && (
                <div>
                  <p className="text-gray-500 text-sm">Tiền dịch vụ</p>
                  <p className="text-sm">{GenCurrecy(hostel?.servicePrice)}</p>
                </div>
              )}
            </div>
          </div>
          <hr />
          {hostel?.description && (
            <div className="my-5 border-top divide-gray-200">
              <p className="text-xl">Mô tả</p>
              <p className="text-sm mt-4">{hostel?.description}</p>
            </div>
          )}

          <hr />
          <div className="my-5 border-top divide-gray-200">
            <p className="text-xl">Các tiện ích khác</p>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {hostel?.utilities?.map((utility: string) => {
                let u = GetUtility(utility, listUtilities);
                return (
                  u && (
                    <div className="">
                      <FontAwesomeIcon icon={u.icon} size="xs" />
                      <span className="text-sm ml-2 font-semibold">
                        {u.name}
                      </span>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
        {/* Author card */}
        <div className="w-full h-12 border border-solid border-gray-200">
          <img
            height={56}
            width={56}
            className="rounded-full mx-auto mt-4"
            src={props.author.avatar}
          />
          <p className="text-sm ml-2 text-center mt-2">
            {'Đăng bởi ' + props.author.name}
          </p>
          <div className="cursor-pointer mt-2">
            <Link href={'/profile/' + props.author.link}>
              <p className="text-sm ml-2 text-gray-500 text-center">
                {'Xem thêm các tin khác từ ' + props.author.name}
              </p>
            </Link>
          </div>
          <div className="mx-auto mt-2">
            <button>Chat với người đăng</button>
          </div>
        </div>
      </div>
      {/* Suggest */}
      {listSuggest && (
        <div className="mt-10">
          <p className="text-xl font-semibold">Gợi ý của chúng tôi</p>
          <div className="">
            <Carousel2 autoplay slidesToShow={4}>
              {[
                ...listSuggest.map((hostel: any, i: any) => {
                  return (
                    <div key={i} className="p-2 mb-4">
                      <SuggestItemBasic
                        link={`${hostel.id}`}
                        img={hostel.imageUrl[0]}
                        title={hostel.name}
                        address={GenAddress(
                          hostel.street,
                          hostel.ward,
                          hostel.district,
                          hostel.province
                        )}
                        cost={hostel.cost}
                      />
                    </div>
                  );
                }),
              ]}
            </Carousel2>
          </div>
        </div>
      )}
    </div>
  );
};

HostelDetail.defaultProps = {
  author: {
    avatar:
      'https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1',
    name: 'Hoang Nam',
    phone: '0123456789',
    link: '',
  },
};

export default HostelDetail;
