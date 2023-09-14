import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Carousel from 'react-material-ui-carousel';
import { Carousel as Carousel2 } from 'antd';
import React from 'react';
import { Button, Divider } from '@mui/material';
import {
  AcUnit,
  Air,
  Balcony,
  Bathroom,
  CameraIndoor,
  Hotel,
  Inventory,
  Kitchen,
  LocalLaundryService,
  Park,
  Pets,
  Wifi,
} from '@mui/icons-material';
import SuggestItemBasic from '../../../components/SuggestItemBasic';
import { SuggestItemBasicProps } from '../../../components/SuggestItemBasic/SuggestItemBasic';
import Link from 'next/link';

const cx = classNames.bind(styles);

interface HostelDetailProps {
  title: string;
  address: string;
  img: string[];
  utilities: Utilities;
  suggest: SuggestItemBasicProps[];
  author: AuthorInfo;
}

interface AuthorInfo {
  avatar: string;
  name: string;
  phone: string;
  link: string;
}

interface Utilities {
  wifi: boolean;
  washingMachine: boolean;
  bed: boolean;
  parking: boolean;
  kitchen: boolean;
  airConditioning: boolean;
  fridge: boolean;
  pet: boolean;
  balcony: boolean;
  camera: boolean;
  bathroom: boolean;
  wardrobe: boolean;
}

const HostelDetail: FC<HostelDetailProps> = (props) => {
  return (
    <div className="hostel-detail w-4/5 mx-auto">
      <div className="bg-slate-50 rounded-lg">
        <Carousel
          autoPlay={true}
          stopAutoPlayOnHover={true}
          animation={'slide'}
        >
          {[
            ...props.img.map((i, index) => {
              return <img className="h-96 object-cover mx-auto" src={i} />;
            }),
          ]}
        </Carousel>
      </div>
      <div className="my-5 text-lg">{props.title}</div>
      <hr />
      <div className="h-auto w-full grid grid-cols-3 gap-4 divide-y divide-gray-200">
        <div className="col-span-2">
          <div className="my-5">
            <div>
              <p className="text-gray-500 text-sm">Địa chỉ</p>
              <p className="text-sm">
                17/5 Tân Thuận Tây, Bình Thuận, quận 7, TPHCM
              </p>
            </div>
            <div className="mt-2">
              <p className="text-gray-500 text-sm">Diện tích</p>
              <p className="text-sm">25 mét vuông</p>
            </div>
            <div className="mt-2">
              <p className="text-gray-500 text-sm">Giá phòng</p>
              <p className="text-sm">1.500.000 đồng</p>
            </div>
            <div className="mt-2">
              <p className="text-gray-500 text-sm">Tiền cọc</p>
              <p className="text-sm">1.500.000 đồng</p>
            </div>
          </div>
          <hr />
          <div className="my-5 border-top divide-gray-200">
            <p className="text-xl">Mô tả</p>
            <p className="text-sm mt-4">
              Nhà mới xây ở 17/5 Tân Thuận Tây, Bình Thuận, quận 7, TPHCM. Chỉ
              còn 5 phòng cực đẹp. Có bãi xe, có camera an ninh, máy giặt chung.
              Phòng trống, chủ nhà trang bị thêm cho 1 bếp từ, 1 tủ lạnh vs 1
              nệm. Máy lạnh nếu sử dụng thì đơn vị gắn máy lạnh mới 200k/tháng,
              máy nước nóng gắn mới 100k/tháng, xe 100k/chiếc, phí dịch vụ
              50k.Điện có đồng hồ riêng hộ gia đình.Nước 25k/khối. Liên hệ:
              0123456789
            </p>
          </div>
          <hr />
          <div className="my-5 border-top divide-gray-200">
            <p className="text-xl">Các tiện ích khác</p>
            <div className="grid grid-cols-3 gap-2 mt-4">
              <div hidden={!props.utilities.wifi}>
                <Wifi />
                <span className="text-sm ml-2">Wifi</span>
              </div>
              <div hidden={!props.utilities.washingMachine}>
                <LocalLaundryService />
                <span className="text-sm ml-2">Máy giặt</span>
              </div>
              <div hidden={!props.utilities.kitchen}>
                <Kitchen />
                <span className="text-sm ml-2">Nhà bếp</span>
              </div>
              <div hidden={!props.utilities.airConditioning}>
                <Air />
                <span className="text-sm ml-2">Điều hòa</span>
              </div>
              <div hidden={!props.utilities.fridge}>
                <AcUnit />
                <span className="text-sm ml-2">Tủ lạnh</span>
              </div>
              <div hidden={!props.utilities.pet}>
                <Pets />
                <span className="text-sm ml-2">Cho nuôi pet</span>
              </div>
              <div hidden={!props.utilities.wardrobe}>
                <Inventory />
                <span className="text-sm ml-2">Tủ đồ</span>
              </div>
              <div hidden={!props.utilities.bed}>
                <Hotel />
                <span className="text-sm ml-2">Giường</span>
              </div>
              <div hidden={!props.utilities.balcony}>
                <Balcony />
                <span className="text-sm ml-2">Ban công</span>
              </div>
              <div hidden={!props.utilities.parking}>
                <Park />
                <span className="text-sm ml-2">Bãi giữ xe</span>
              </div>
              <div hidden={!props.utilities.camera}>
                <CameraIndoor />
                <span className="text-sm ml-2">Camera an ninh</span>
              </div>
              <div hidden={!props.utilities.bathroom}>
                <Bathroom />
                <span className="text-sm ml-2">Nhà tắm riêng</span>
              </div>
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
            <Button variant="outlined">Chat với người đăng</Button>
          </div>
        </div>
      </div>
      {/* Suggest */}
      {props.suggest && (
        <div className="mt-10">
          <p className="text-xl font-semibold">Gợi ý của chúng tôi</p>
          <div className="">
            <Carousel2 autoplay slidesToShow={4}>
              {[
                ...props.suggest.map((i, index) => {
                  return (
                    <div className="p-2 mb-4">
                      <SuggestItemBasic
                        img={i.img}
                        title={i.title}
                        address={i.address}
                        cost={i.cost}
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
  title: 'Còn 4 phòng mới - sạch - đẹp, an ninh, 4tr/th, tiện ích đầy đủ',
  address: '',
  img: [
    'https://vinhtuong.com/sites/default/files/inline-images/dac-diem-nha-cap-4.png',
    'https://achi.vn/wp-content/uploads/2021/07/Thiet-ke-biet-thu-nha-vuon-2-tang-mai-thai-dep-300m2-tai-dong-nai-achi-22102-01.jpg',
    'https://vinhtuong.com/sites/default/files/inline-images/dac-diem-nha-cap-4.png',
    'https://kantechpaint.com/wp-content/uploads/2023/02/thiet-ke-nha-pho-2-tang-mai-thai.jpg',
  ],
  utilities: {
    wifi: true,
    washingMachine: true,
    bed: true,
    parking: true,
    kitchen: true,
    airConditioning: true,
    fridge: true,
    pet: true,
    balcony: true,
    camera: true,
    bathroom: true,
    wardrobe: true,
  },
  suggest: [
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Nha 1',
      address: 'Quan 4, tp HCM',
      cost: 1500000,
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Nha 1',
      address: 'Quan 4, tp HCM',
      cost: 1500000,
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Nha 1',
      address: 'Quan 4, tp HCM',
      cost: 1500000,
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Nha 1',
      address: 'Quan 4, tp HCM',
      cost: 1500000,
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Nha 1',
      address: 'Quan 4, tp HCM',
      cost: 1500000,
    },
  ],
  author: {
    avatar:
      'https://i0.wp.com/www.artstation.com/assets/default_avatar.jpg?ssl=1',
    name: 'Hoang Nam',
    phone: '0123456789',
    link: '',
  },
};

export default HostelDetail;
