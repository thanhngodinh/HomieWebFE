import React, { FC, useState, useEffect, useMemo } from 'react';
import SubHeader from '../../../components/SubHeader';
import {
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
} from 'antd';
import { District, HostelCreate, Province, User, Ward } from '../../../models';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { getMyProfile, selectUsers } from '../../../redux/user/slice';
import EditProfile from './EditProfile';
import LoadProfile from './LoadProfile';

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { profile, loading, error } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getMyProfile());
  }, [dispatch]);

  const [isEdit, setIsEdit] = useState(false);

  return (
    <>
      <SubHeader
        title="Quản lý tài khoản"
        items={[
          { id: 'profile', name: 'Hồ Sơ' },
          { id: 'security', name: 'Bảo mật' },
          { id: 'post', name: 'Quản lý tin đăng' },
        ]}
      ></SubHeader>
      <div className="container mx-auto my-12">
        <div className="grid grid-cols-3">
          <div className="col-span-1 text-center border-r-4">
            <h2 className="mb-8">Hồ sơ</h2>
            <div className="grid grid-flow-row auto-rows-max items-center gap-8">
              <div className="">
                <Avatar
                  size={{ xs: 32, sm: 40, md: 64, lg: 80, xl: 100, xxl: 124 }}
                  src={profile?.avatar}
                >
                  {profile?.name}
                </Avatar>
              </div>

              <h2>{profile?.name}</h2>
              <div className="grid grid-cols-2 divide-x items-center">
                <h3>
                  2<div className="text__normal">Đã theo dõi</div>
                </h3>
                <h3>
                  12<div className="text__normal">Người theo dõi</div>
                </h3>
              </div>

              <div className="">
                <button
                  type="button"
                  className="button button__fill button__fill-large text__normal"
                >
                  Thay đổi ảnh đại diện
                </button>
              </div>

              <div className="">
                <button
                  type="button"
                  className="button button__border button__border-large text__normal"
                  onClick={() => setIsEdit(!isEdit)}
                >
                  {isEdit ? 'Hủy' : 'Cập nhật thông tin cá nhân'}
                </button>
              </div>
            </div>
          </div>
          <div className="col-span-2 pl-48">
            <h4 className="">Thông tin cá nhân</h4>

            {/* <div className="flex justify-end gap-4">
              <Button htmlType="reset" className="button button__border" >
                Hủy
              </Button>
              <Button htmlType="submit" className="button button__fill">
                Lưu
              </Button>
            </div> */}
            {isEdit ? (
              <EditProfile profile={profile} />
            ) : (
              <LoadProfile profile={profile} />
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
