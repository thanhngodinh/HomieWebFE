import React, { FC, useState, useEffect, useMemo } from 'react';
import { GenCurrecy } from '../../../utils/func';
import { User } from '../../../models';

interface ProfileProps {
  profile: User;
}

const LoadProfile: FC<ProfileProps> = ({ profile }) => {
  return (
    <div className="h-4/5 flex flex-col justify-start gap-5 mt-4">
      <p className="text-base font-semibold">Họ tên: <span className="font-normal">{profile?.name}</span></p>
      <p className="text-base font-semibold">
        Email: <span className="font-normal">{profile?.email}{' '}
        {profile?.isVerifiedEmail ? '(verified)' : '(not verified)'}</span>
      </p>
      <p className="text-base font-semibold">Phone: <span className="font-normal">{profile?.phone}</span></p>
      <p className="text-base font-semibold">
        Đang:{' '}
        {profile?.isFindRoommate
          ? <span className="font-normal">Tìm kiếm bạn ở chung</span>
          : <span className="font-normal">Không tìm bạn ở chung</span>}
      </p>
      <p className="text-base font-semibold">
        Tỉnh/Thành phố mong muốn: <span className="font-normal">{profile?.province}</span>
      </p>
      <p className="text-base font-semibold">
        Quận/Huyện mong muốn: <span className="font-normal">{profile?.district?.toString()}</span>
      </p>
      <p className="text-base font-semibold">
        Giới tính: <span className="font-normal">{profile?.gender == 'M' ? 'Nam' : 'Nữ'}</span>
      </p>
      <p className="text-base font-semibold">
        Giá phòng mong muốn: <span className="font-normal">{GenCurrecy(profile?.costFrom)} -{' '}
        {GenCurrecy(profile?.costTo)}</span>
      </p>
    </div>
  );
};

export default LoadProfile;
