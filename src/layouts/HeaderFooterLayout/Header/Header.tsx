import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import Link from 'next/link';
import { getToken } from '../../../app/token';
import { checkCreatePost } from '../../../redux/hostel/slice';
import { BaseResponse } from '../../../models';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../../app/store';

const cx = classNames.bind(styles);

const Header: FC = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const [token, setToken] = useState('');
  useEffect(() => {
    let value = sessionStorage.getItem('token') || '';
    setToken(value);
  }, []);
  return (
    <header className="w-screen h-fit">
      <div className="suggestion w-screen h-9 bg-purple text-center light flex items-center justify-center">
        <p className="text-white light text-base">
          Cao điểm tìm nhà sắp đến, hãy tìm một nơi trú chân trước khi mùa đông
          tới nhé!
        </p>
      </div>
      <div className="w-full h-fit grid grid-cols-9 grid-flow-row bg-white light py-2">
        <div className="col-span-2 text-center h-full flex items-center justify-center">
          <Link href="/">
            <span className="text-purple light text-2xl light cursor-pointer">
              Homie
            </span>
          </Link>
        </div>
        <div className="flex justify-center items-center col-span-5">
          <ul className="flex flex-col md:flex-row h-full items-center gap-2">
            <li>
              <Link href="/" aria-current="page">
                <span className="block py-2 pl-3 pr-4 text-purple font-medium hover:underline light text-base cursor-pointer">
                  Trang chủ
                </span>
              </Link>
            </li>
            <li>
              <Link href="/roommates">
                <span className="block py-2 pl-3 pr-4 text-purple font-medium light text-base hover:underline cursor-pointer">
                  Tìm bạn
                </span>
              </Link>
            </li>
            <li>
              <Link href="/posts">
                <span className="block py-2 pl-3 pr-4 text-purple font-medium light text-base hover:underline cursor-pointer">
                  Tìm nhà
                </span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="col-span-2 text-center">
          <ul className="flex flex-col md:flex-row h-full items-center gap-2">
            <li>
              <button
                onClick={() => {
                  dispatch(
                    checkCreatePost((status: string) => {
                      console.log(status);
                      if (status == 'success') {
                        router.push('/create');
                      } else if (status == 'not login') {
                        router.push('/login');
                      } else if (status == 'not verify phone') {
                        router.push('/my/profile');
                      } else {
                        router.push('/');
                      }
                    })
                  );
                }}
              >
                <span className="block py-2 pl-3 pr-4 text-purple font-medium light text-base hover:underline cursor-pointer">
                  Đăng tin
                </span>
              </button>
            </li>
            {token.length > 0 ? (
              <>
                <li className="flex">
                  <Link href="/my/profile">
                    <span className="block py-2 pl-3 pr-4 text-purple font-medium light text-base hover:underline cursor-pointer">
                      My
                    </span>
                  </Link>
                </li>
                <li className="flex">
                  <a href="/">
                    <span
                      onClick={() => sessionStorage?.setItem('token', '')}
                      className="block py-2 pl-3 pr-4 text-purple font-medium light text-base hover:underline cursor-pointer"
                    >
                      Logout
                    </span>
                  </a>
                </li>
              </>
            ) : (
              <li className="flex">
                <Link href="/login">
                  <span className="block py-2 pl-3 pr-4 text-purple font-medium light text-base hover:underline cursor-pointer">
                    Đăng nhập
                  </span>
                </Link>
                <span className="text-purple">/</span>
                <Link href="/register">
                  <span className="block py-2 pl-3 pr-4 text-purple font-medium light text-base hover:underline cursor-pointer">
                    Đăng ký
                  </span>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </header>
  );
};

export default Header;
