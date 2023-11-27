import React, { FC, useState, useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './UpdatePassword.module.scss';
import PostItem from '../../components/PostItem';
import SubHeader from '../../components/SubHeader';
import { Avatar, Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import { ResetUser } from '../../models';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { selectStatusState, updatePassword } from '../../redux/user/slice';
import { setToken } from '../../app/token';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

interface UpdatePasswordProps {}

const UpdatePassword: FC<UpdatePasswordProps> = () => {
  const [form] = Form.useForm();

  const status = useSelector(selectStatusState);
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetUser>({
    defaultValues: {
      oldPassword: '',
      newPassword: '',
      confirmPassword: '',
    },

    resolver: yupResolver(schema),
  });

  const onSubmit = (data: any) => {
    dispatch(updatePassword(data)).finally(() => {
      setToken('');
      router.push('/login');
    });
  };

  return (
    <>
      <div className="w-1/2 mx-auto my-20">
        <div className="flex flex-col justify-center items-left px-8">
          <h4 className="mb-4">Thay đổi mật khẩu</h4>

          <Form
            form={form}
            name="validateOnly"
            layout="vertical"
            autoComplete="off"
            onFinish={handleSubmit(onSubmit)}
          >
            <FormItem name="oldPassword" label="Mật khẩu cũ" control={control}>
              <Input.Password />
            </FormItem>

            <FormItem name="newPassword" label="Mật khẩu mới" control={control}>
              <Input.Password />
            </FormItem>

            <FormItem
              name="confirmPassword"
              label="Nhập lại mật khẩu mới"
              control={control}
            >
              <Input.Password />
            </FormItem>
            <Button htmlType="reset" className="button button__border">
              Hủy
            </Button>
            <Button htmlType="submit" className="button button__fill ml-8">
              Lưu
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default UpdatePassword;
