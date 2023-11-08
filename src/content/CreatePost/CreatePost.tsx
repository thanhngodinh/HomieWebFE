import React, { FC, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { useForm } from "react-hook-form";

import BasicInformation from './BasicInformation';
import Map from '../../components/Map';

const cx = classNames.bind(styles);

interface CreatePostProps { }

export type Address = {
  province?: string;
  district: string;
  ward: string;
  street: string;
}

const CreatePost: FC<CreatePostProps> = () => {
  const [address,setAddress] = useState({province: '', district: '', ward: '', street: ''})
  const getAddress = (value: Address) => {
    setAddress((prev) => {return {...prev, ...value}})
  }
  const formatGoogleAddress = (addressObject: Address) => {
    // Tạo một mảng chứa các phần của địa chỉ
    const addressParts = [];
    // Thêm phần tỉnh/thành phố nếu có
    if (addressObject.province) {
      addressParts.push(addressObject.province);
    }
  
    // Thêm phần quận/huyện nếu có
    if (addressObject.district) {
      addressParts.push(addressObject.district);
    }
  
    // Thêm phần phường/xã nếu có
    if (addressObject.ward) {
      addressParts.push(addressObject.ward);
    }
  
    // Thêm phần đường/địa chỉ cụ thể nếu có
    if (addressObject.street) {
      addressParts.push(addressObject.street);
    }
  
    // Kết hợp các phần thành một chuỗi bằng dấu phân cách ", "
    const formattedAddress = addressParts.join(', ');
  
    return formattedAddress;
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <div>Để mọi người cùng biết</div>
      <div>
        Bạn có nhà muốn cho thuê nhưng chưa có kênh? Hãy viết vài dòng để đưa
        mọi người đến nhà của bạn nhé.
      </div>
      <div className="container mx-auto grid grid-cols-2 my-8 gap-4">
        <div className="lg:col-span-1  col-span-2">
          <BasicInformation getAddress={getAddress}/>
        </div>
        <div className="lg:col-span-1  col-span-2">
          <div className="text-base py-4 px-6 rounded mb-4" style={{boxShadow: 'rgba(0, 0, 0, 0.4) 0px 2px 4px, rgba(0, 0, 0, 0.3) 0px 7px 13px -3px, rgba(0, 0, 0, 0.2) 0px -3px 0px inset'}}>
            {address.province && address.province}  {address.district && ' - ' + address.district} {address.ward && ' - ' + address.ward} {address.street && ' - ' + address.street}</div>
          <Map address={formatGoogleAddress(address)}></Map>
        </div>
        
      </div>
    </div>
  );
};

export default CreatePost;
