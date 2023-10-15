import { FC, useEffect, useState } from 'react';
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

interface HostelDetailProps {}

const HostelDetail: FC<HostelDetailProps> = (props) => {
  const router = useRouter();
  const id = router.query.id as string;

  const [isShowPhone, setIsShowPhone] = useState(false);

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
      <div className="my-5 text-lg font-semibold">{hostel?.name}</div>
      <hr />
      <div className="h-auto w-full grid grid-cols-3 gap-4 divide-y divide-gray-200">
        <div className="col-span-2">
          <div className="my-5">
            <p className="text-xl font-semibold mb-5">Thông tin cơ bản</p>
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
              {hostel?.capacity && (
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">Sức chứa</p>
                  <p className="text-sm">{`${hostel?.capacity} người`}</p>
                </div>
              )}
              {hostel?.area && (
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">Diện tích</p>
                  <p className="text-sm">{`${hostel?.area} mét vuông`}</p>
                </div>
              )}
            </div>
            <div className="mt-2 grid grid-cols-4">
              <div className="mt-2">
                <p className="text-gray-500 text-sm">Giá phòng</p>
                <p className="text-sm">{GenCurrecy(hostel?.cost)}</p>
              </div>
              <div className="mt-2">
                <p className="text-gray-500 text-sm">Tiền cọc</p>
                <p className="text-sm">{GenCurrecy(hostel?.deposit)}</p>
              </div>
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
              <p className="text-xl font-semibold">Mô tả</p>
              <p className="text-sm mt-4">{hostel?.description}</p>
            </div>
          )}

          <hr />
          <div className="my-5 border-top divide-gray-200">
            <p className="text-xl font-semibold">Các tiện ích khác</p>

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
          <hr />
        </div>
        {/* Author card */}
        <div className="grid grid-rows-6 w-full h-2/5 border border-solid border-gray-200 content-center py-2">
          <img
            height={64}
            width={64}
            className="rounded-full mx-auto row-span-2"
            src={hostel?.authorAvatar}
          />
          <p className="text-sm text-center row-span-1 m-auto">
            {'Đăng bởi ' + hostel?.author}
          </p>
          <div className="cursor-pointer row-span-1 m-auto">
            <Link href={'/users/' + hostel?.createdBy}>
              <p className="text-sm ml-2 text-gray-500 text-center">
                {'Xem thêm các tin khác từ ' + hostel?.author}
              </p>
            </Link>
          </div>
          <div className="row-span-2 m-auto">
            <button
              type="button"
              className="button button__fill button__fill-large text__normal"
              onClick={() => setIsShowPhone(!isShowPhone)}
            >
              {isShowPhone
                ? 'Liên hệ ' + hostel?.phone
                : 'Bấm để xem số điện thoại'}
            </button>
          </div>
          <div className="row-span-2 m-auto">
            <Link href="/chat">
              <button
                type="button"
                className="button button__border button__border-large text__normal"
              >
                Chat với người đăng
              </button>
            </Link>
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

export default HostelDetail;
