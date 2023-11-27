import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Login, Register } from '../../models/auth';
import User from '../../models/user';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Link from 'next/link';
import bg from '../../assets/img/bg-login.png';
import google from '../../assets/img/icons8-google-48.png';
import facebook from '../../assets/img/icons8-facebook-48.png';
import Image from 'next/image';
import { Button, Form, Input } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validate';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { registerAccount } from '../../redux/auth/slice';
import { FormItem } from 'react-hook-form-antd';
import { useRouter } from 'next/router';

const cx = classNames.bind(styles);

type FormValues = {
  userName: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: yupResolver(schema),
  });

  return (
    <div className={cx('wrapper')}>
      <Image src={bg} alt="left-side-img" width="300px" height="100vh"></Image>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        onFinish={handleSubmit((data) => {
          dispatch(
            registerAccount({
              data: { ...data },
              callback: () => router.push('/login'),
            })
          );
        })}
      >
        <div className={cx('right-side')}>
          <h3>Tạo tài khoản cho bạn</h3>
          <FormItem name="username" label="Email" control={control} required>
            <Input />
          </FormItem>
          <FormItem name="phone" label="Số điện thoại" control={control}>
            <Input />
          </FormItem>
          <FormItem name="name" label="Họ tên" control={control}>
            <Input />
          </FormItem>

          <Button htmlType="submit" className={cx('button__register')}>
            Đăng ký
          </Button>

          {/* <div className={cx('other-login')}>
            <p>
              <span>Hoặc đăng nhập với</span>
            </p>
            <button className="relative text-center">
              <div className="absolute left-2">
                <Image
                  src={google}
                  alt="google-icon"
                  width="20px"
                  height="20px"
                />
              </div>
              <span>Tiếp tục với Google</span>
            </button>
            <button className="relative text-center">
              <div className="absolute left-2">
                <Image
                  src={facebook}
                  alt="facebook-icon"
                  width="20px"
                  height="20px"
                />
              </div>
              <span>Tiếp tục với Facebook</span>
            </button>
          </div> */}

          <div className={cx('footer')}>
            <span>Đã có tài khoản? </span>
            <Link href="/login">
              <button className={cx('login-btn')}>Đăng nhập</button>
            </Link>
          </div>
        </div>
      </Form>
    </div>
  );
};

export default RegisterPage;
