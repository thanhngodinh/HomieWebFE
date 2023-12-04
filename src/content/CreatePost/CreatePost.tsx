import React, { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';

import BasicInformation from './BasicInformation';
import Map from '../../components/Map';
import axiosClient from '../../api/axiosClient';
import { formatGoogleAddress } from '../../utils/func';

const cx = classNames.bind(styles);

interface CreatePostProps {}

export type Address = {
  province?: string;
  district: string;
  ward: string;
  street: string;
};

export type Coord = {
  address: string;
  placeId: string;
  longitude: number;
  latitude: number;
};

const CreatePost: FC<CreatePostProps> = () => {
  const [address, setAddress] = useState({
    province: '',
    district: '',
    ward: '',
    street: '',
  });
  const [coord, setCoord] = useState<Coord>();
  const getAddress = (value: Address) => {
    setAddress((prev) => {
      return { ...prev, ...value };
    });
  };

  useEffect(() => {
    (async () => {
      const getCoord = (address: string): Promise<any> => {
        const url = `https://rsapi.goong.io/geocode?address=${encodeURIComponent(
          address
        )}&api_key=${process.env.NEXT_PUBLIC_GOONG_API_TOKEN}`;
        return axiosClient.get(url);
      };
      try {
        const coord = await getCoord(formatGoogleAddress(address));
        console.log('coord', address);
        const position = {
          address: coord.results[0].formatted_address,
          placeId: coord.results[0].place_id,
          longitude: coord.results[0].geometry.location.lng,
          latitude: coord.results[0].geometry.location.lat,
        };

        setCoord(position);
      } catch (error) {}
    })();
  }, [address]);

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="px-8 py-2 bg-slate-100">
        <p>
          Bạn có nhà muốn cho thuê nhưng chưa có kênh? Hãy viết vài dòng để đưa
          mọi người đến nhà của bạn nhé.
        </p>
      </div>

      <div className="container mx-auto grid grid-cols-2 my-8 gap-4">
        <div className="lg:col-span-1  col-span-2">
          <BasicInformation getAddress={getAddress} coord={coord} />
        </div>
        <div className="lg:col-span-1  col-span-2">
          <div
            className="text-base py-4 px-6 rounded mb-4"
            style={{
              boxShadow:
                'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset',
            }}
          >
            {formatGoogleAddress(address)}
          </div>
          <div className="h-[600px]">
            <Map address={coord?.address || ''}></Map>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
