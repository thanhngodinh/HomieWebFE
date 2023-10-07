import React,{ FC, useState , useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Security.module.scss';
import PostItem from '../../../components/PostItem';
import SubHeader from '../../../components/SubHeader';
import { Avatar, Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import { District, HostelCreate, Province, ResetUser, User, Ward } from '../../../models';
import { useForm } from 'react-hook-form';
import { FormItem } from "react-hook-form-antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from './validate';



const cx = classNames.bind(styles);

interface SecurityProps {}

const Security: FC<SecurityProps> = () => {
  const [form] = Form.useForm();
  const [province, setProvince] = useState<Province[]>([]);
  const [district, setDistrict] = useState<District[]>([]);
  const [ward, setWard] = useState<Ward[]>([]);

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

    resolver: yupResolver(schema)
  });

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
        <div className="flex flex-col justify-center items-left px-8">

            <h4 className="mb-4">Bảo mật</h4>

            <Form
              form={form}
              className='w-1/2'
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              onFinish={handleSubmit((data)=>{
                console.log(data);
              })}
           
            >
              
              <FormItem name="oldPassword" label="Mật khẩu cũ" control={control}>
                <Input.Password />
              </FormItem>

              <FormItem name="newPassword" label="Mật khẩu mới" control={control}>
                <Input.Password />
              </FormItem>

              <FormItem name="confirmPassword" label="Nhập lại mật khẩu mới" control={control}>
                <Input.Password />
              </FormItem>
              <Button htmlType="reset" className="button button__border" >
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

export default Security;
