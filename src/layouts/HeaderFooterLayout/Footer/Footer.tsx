import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer: FC = () => {
  return (
    <footer className="bg-slate-100 w-screen mt-5 px-40 pt-20 pb-20">
      <div className="grid grid-cols-12 ">
        <div className="col-span-6">
          <h1 className="text-xl">Hỗ trợ</h1>
          <ul className="no-underline mt-2">
            <li className="text-base text-gray-600 font-light">
              Hãy liên hệ với chúng tôi để được hỗ trợ sớm nhất
            </li>
            {/* <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li> */}
          </ul>
        </div>
        <div className="col-span-6">
          <h1 className="text-xl">Liên hệ</h1>
          <ul className="no-underline mt-2">
            <li className="text-base text-gray-600">
              Email: thanh.ngodinh2000@gmail.com
            </li>
            <li className="text-base text-gray-600 mt-1">
              Số điện thoại: 0328386625
            </li>
            <li className="text-base text-gray-600 mt-1">
              <a className="text-gray-600" href="https://web.facebook.com/thanhngo00/">Facebook: Thạnh Ngô</a>
            </li>
            {/* <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li> */}
          </ul>
        </div>
        {/* <div className="col-span-3">
          <h1 className="text-xl">Hosting</h1>
          <ul className="no-underline mt-2">
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
          </ul>
        </div>
        <div className="col-span-3">
          <h1 className="text-xl">About</h1>
          <ul className="no-underline mt-2">
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
          </ul>
        </div> */}
      </div>
      {/* <hr className="mt-10" /> */}
    </footer>
  );
};

export default Footer;
