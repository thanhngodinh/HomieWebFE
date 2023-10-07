import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Account } from '../../models/account';
import User from '../../models/user';
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

const cx = classNames.bind(styles);

type FormValues = {
  username: string;
  password: string;
};

const LoginPage: React.FC = () => {
  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();
  const { token, loading, error } = useSelector(selectAuths);

  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = handleSubmit((data) => {
    const acc: Account = { ...data };
    dispatch(
      loginAccount({
        account: acc,
        callback: () => router.push('/'),
      })
    );
  });

  return (
    <div className={cx('wrapper')}>
      <div className="w-7/12 relative">
        <Image src={bg} alt="left-side-img" layout="fill" objectFit="cover" />
      </div>
      <div className={cx('right-side')}>
        <h3>Đăng nhập</h3>
        <form onSubmit={onSubmit}>
          <label htmlFor="username">Email hoặc số điện thoại</label>
          <input
            type="text"
            placeholder="Email hoặc số điện thoại"
            {...register('username')}
          />
          <label htmlFor="password">Mật khẩu</label>
          <input type="text" placeholder="Mật khẩu" {...register('password')} />

          <button className={cx('login-btn')}>Đăng nhập</button>
        </form>
        <div className="flex w-full text-sm">
          <div className="flex w-full flex-1">
            <input type="checkbox" className="w-4 w-1/6 mr-1" />
            <span>Nhớ tài khoản</span>
          </div>
          <span className="flex-1 text-right text-purple light">
            Quên mật khẩu?
          </span>
        </div>
        <div className={cx('other-login')}>
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
        </div>
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
