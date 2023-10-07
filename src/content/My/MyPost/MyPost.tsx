import { FC } from 'react';
import classNames from 'classnames/bind';
import styles from './MyPost.module.scss';
import PostItem from '../../../components/PostItem';
import SubHeader from '../../../components/SubHeader';

const cx = classNames.bind(styles);

interface MyPostProps {}

const MyPost: FC<MyPostProps> = () => {
  return (
    <>
      <SubHeader title="Quản lý tài khoản" items={[{id: 'profile',name: 'Hồ Sơ'},{id: 'security',name: 'Bảo mật'},{id: 'post',name: 'Quản lý tin đăng'}]}></SubHeader>
      <div className="container mx-auto  my-12">
          <div className={cx("mypost")}>
            <div className="py-4 border-t-4  border-b-4">
              <PostItem id={''} />
            </div>
            
            <div className="py-4 border-t-4  border-b-4">
              <PostItem  id={''}/>
            </div>
          </div>
      </div>
    </>
  )
};

export default MyPost;
