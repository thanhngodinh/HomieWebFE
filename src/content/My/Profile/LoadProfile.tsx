import React, { FC, useState, useEffect, useMemo } from 'react';
import { GenCurrecy } from '../../../utils/func';
import { User } from '../../../models';
import { Button, Input } from 'antd';
import { verifyPhone, verifyPhoneOTP } from '../../../redux/user/slice';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { useRouter } from 'next/router';

interface ProfileProps {
  profile: User;
}

const LoadProfile: FC<ProfileProps> = ({ profile }) => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const [isOpenOTP, setIsOpenOTP] = useState(false);
  const [otp, setOTP] = useState('');

  return (
    <div className="h-4/5 flex flex-col justify-start gap-5 mt-4">
      <p className="text-base font-semibold">
        Họ tên: <span className="font-normal">{profile?.name}</span>
      </p>
      <p className="text-base font-semibold">
        Email: <span className="font-normal">{profile?.email}</span>
      </p>
      <p className="text-base font-semibold">
        Phone:{' '}
        <span className="font-normal">
          {profile?.phone}{' '}
          {profile?.isVerifiedPhone ? '(Đã xác nhận)' : '(Chưa xác nhận)'}
        </span>
        {!profile?.isVerifiedPhone && (
          <Button
            className="button button__fill ml-6"
            onClick={() => {
              dispatch(verifyPhone({ phone: profile?.phone || '' }));
              setIsOpenOTP(true);
            }}
          >
            Xác nhận
          </Button>
        )}
      </p>

      {isOpenOTP && (
        <div className="flex">
          <Input
            placeholder="Hãy nhập mã OTP"
            onChange={(e) => {
              setOTP(e.target.value);
            }}
          />
          <Button
            className="button button__fill ml-6"
            onClick={() => {
              dispatch(verifyPhoneOTP({ otp: otp })).finally(() => {
                router.reload();
              });
              setIsOpenOTP(true);
            }}
          >
            Xác nhận OTP
          </Button>
        </div>
      )}

      <p className="text-base font-semibold">
        Đang:{' '}
        {profile?.isFindRoommate ? (
          <span className="font-normal">Tìm kiếm bạn ở chung</span>
        ) : (
          <span className="font-normal">Không tìm bạn ở chung</span>
        )}
      </p>
      <p className="text-base font-semibold">
        Tỉnh/Thành phố mong muốn:{' '}
        <span className="font-normal">{profile?.province}</span>
      </p>
      <p className="text-base font-semibold">
        Quận/Huyện mong muốn:{' '}
        <span className="font-normal">
          {profile?.district?.toString()
            .replace('{', '')
            .replace('}', '')
            .replaceAll(`"`, '')}
        </span>
      </p>
      <p className="text-base font-semibold">
        Bạn muốn ở chung: <span className="font-normal">{profile?.gender}</span>
      </p>
      <p className="text-base font-semibold">
        Giá phòng mong muốn:{' '}
        <span className="font-normal">
          {GenCurrecy(profile?.costFrom)} - {GenCurrecy(profile?.costTo)}
        </span>
      </p>
    </div>
  );
};

export default LoadProfile;
