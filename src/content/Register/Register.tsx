import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { login, usersSelector } from '../../features/account';
import { Account } from '../../models/account';
import User from '../../models/user';
import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import Link from 'next/link';
import bg from '../../assets/img/bg-login.png';
import google from '../../assets/img/icons8-google-48.png';
import facebook from '../../assets/img/icons8-facebook-48.png';
import Image from 'next/image';

const cx = classNames.bind(styles);

type FormValues = {
  userName: string;
  password: string;
};

const RegisterPage: React.FC = () => {
  // const dispatch = useAppDispatch();
  // const users: User[] = useAppSelector(usersSelector) || [];

  // const { register, handleSubmit } = useForm<FormValues>();

  // const onSubmit = handleSubmit((data) => {
  //   const acc: Account = { ...data };
  //   dispatch(login(acc));
  // });

  return (
    <div className={cx('wrapper')}>
      <Image src={bg} alt="left-side-img" width="300px" height="100vh"></Image>
      <div className={cx('right-side')}>
        <h3>Tạo tên riêng cho bạn</h3>
        <div>
          <label htmlFor="email">Email hoặc số điện thoại</label>
          <input
            type="text"
            name="email"
            placeholder="Email hoặc số điện thoại"
          />
          <label htmlFor="password">Mật khẩu</label>
          <input type="text" name="password" placeholder="Mật khẩu" />
          <div className={cx('name')}>
            <div className={cx('lastname')}>
              <label htmlFor="lastname">Họ</label>
              <input type="text" name="lastname" placeholder="Họ" />
            </div>
            <div className={cx('firstname')}>
              <label htmlFor="firstname">Tên</label>
              <input type="text" name="firstname" placeholder="Tên" />
            </div>
          </div>
          <label htmlFor="address">Địa chỉ</label>
          <input type="text" name="address" placeholder="Địa chỉ" />
        </div>
        <button className={cx('register-btn')}>Đăng ký</button>
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
          <span>Đã có tài khoản? </span>
          <Link href="/login">
            <button className={cx('login-btn')}>Đăng nhập</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
