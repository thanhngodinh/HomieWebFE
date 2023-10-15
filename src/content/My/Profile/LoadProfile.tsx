import React, { FC, useState, useEffect, useMemo } from 'react';
import { GenCurrecy } from '../../../utils/func';
import { User } from '../../../models';

interface ProfileProps {
  profile: User;
}

const LoadProfile: FC<ProfileProps> = ({ profile }) => {
  return (
    <>
      <p className="text-base row-span-1">Họ tên: {profile?.name}</p>
      <p className="text-base row-span-1">
        Email: {profile?.email}{' '}
        {profile?.isVerifiedEmail ? '(verified)' : '(not verified)'}
      </p>
      <p className="text-base row-span-1">Phone: {profile?.phone}</p>
      <p className="text-base row-span-1">
        Đang:{' '}
        {profile?.isFindRoommate
          ? 'Tìm kiếm bạn ở chung'
          : 'Không tìm bạn ở chung'}
      </p>
      <p className="text-base row-span-1">
        Tỉnh/Thành phố mong muốn: {profile?.province}
      </p>
      <p className="text-base row-span-1">
        Quận/Huyện mong muốn: {profile?.district}
      </p>
      <p className="text-base row-span-1">
        Giới tính: {profile?.gender == 'M' ? 'Nam' : 'Nữ'}
      </p>
      <p className="text-base row-span-1">
        Giá phòng mong muốn: {GenCurrecy(profile?.costFrom)} -{' '}
        {GenCurrecy(profile?.costTo)}
      </p>
    </>
  );
};

export default LoadProfile;
