import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './Footer.module.scss';

const cx = classNames.bind(styles);

const Footer: FC = () => {
  return (
    <footer className="bg-gray-100 w-screen mt-0 px-40 pt-20 pb-20">
      <div className="grid grid-cols-12">
        <div className="col-span-3">
          <h1 className="text-xl">Support</h1>
          <ul className="no-underline mt-2">
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
          </ul>
        </div>
        <div className="col-span-3">
          <h1 className="text-xl">Community</h1>
          <ul className="no-underline mt-2">
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
            <li className="text-sm text-gray-600 font-light">Help Center</li>
          </ul>
        </div>
        <div className="col-span-3">
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
        </div>
      </div>
      <hr className="mt-10" />
    </footer>
  );
};

export default Footer;
