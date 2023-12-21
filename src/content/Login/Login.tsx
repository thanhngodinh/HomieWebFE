import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Login, LoginRes } from '../../models/auth';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import bg from '../../assets/img/bg-login.png';
import google from '../../assets/img/icons8-google-48.png';
import facebook from '../../assets/img/icons8-facebook-48.png';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { loginAccount, selectAuths } from '../../redux/auth/slice';
import { useRouter } from 'next/router';
import { FormItem } from 'react-hook-form-antd';
import { Form, Input } from 'antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validate';

const cx = classNames.bind(styles);

type FormValues = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [form] = Form.useForm();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: yupResolver(schema),
  });

  const dispatch = useDispatch<AppDispatch>();

  return (
    <div className={'flex h-full w-1/2 mx-auto'}>
      <div className="w-1/2 relative">
        <Image src={bg} alt="left-side-img" layout="fill" objectFit="cover" />
      </div>
      <div className={'w-full relative my-10 mx-4'}>
        <h3>Đăng nhập</h3>
        <Form
          form={form}
          name="validateOnly"
          layout="vertical"
          onFinish={handleSubmit((data) => {
            dispatch(
              loginAccount({
                data: { ...data },
                callback: (res: LoginRes) => {
                  console.log(res);
                  if (res.isResetPass) {
                    router.push('/update-password');
                  } else {
                    router.push('/');
                  }
                },
              })
            );
          })}
        >
          <FormItem
            name="username"
            label="Username hoặc email"
            control={control}
            required
          >
            <Input size="large" />
          </FormItem>
          <FormItem name="password" label="Mật khẩu" control={control} required>
            <Input.Password size="large" />
          </FormItem>

          <button className={cx('login-btn')}>Đăng nhập</button>
        </Form>

        <div className="flex w-full text-sm">
          <div className="flex w-full flex-1">
            <input type="checkbox" className="w-4 w-1/6 mr-1" />
            <span>Nhớ tài khoản</span>
          </div>
          <span className="flex-1 text-right text-purple light">
            Quên mật khẩu?
          </span>
        </div>

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
          <span>Chưa có tài khoản? </span>
          <Link href="/register">
            <button className={cx('register-btn')}>Đăng Ký</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
