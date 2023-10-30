import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './LikedPost.module.scss';
import PostItem from '../../../components/PostItem';
import SubHeader from '../../../components/SubHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { getMyLikedPosts, selectUsers } from '../../../redux/user/slice';
import HostelItem from '../../../components/HostelItem';
import { GenAddress } from '../../../utils/func';

const cx = classNames.bind(styles);

interface MyPostProps {}

const LikedPost: FC<MyPostProps> = () => {
  const [token, setToken] = useState('');
  useEffect(() => {
    let value = localStorage.getItem('token') || '';
    setToken(value);
  }, []);

  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getMyLikedPosts());
  }, [dispatch]);

  return (
    <>
      <SubHeader
        title="Quản lý tài khoản"
        items={[
          { id: 'profile', name: 'Hồ Sơ' },
          { id: 'security', name: 'Bảo mật' },
          { id: 'post', name: 'Quản lý tin đăng' },
          { id: 'liked-post', name: 'Tin đã thích' },
        ]}
      ></SubHeader>
      <div className="container mx-auto my-12">
        <div className={cx('mypost')}>
          {posts?.map((post: any) => {
            return (
              <>
                <div className="py-4">
                  <HostelItem
                    id={post.id}
                    name={post.name}
                    img={post.imageUrl[0]}
                    size={post.capacity}
                    address={GenAddress(
                      post.street,
                      post.ward,
                      post.district,
                      post.province
                    )}
                    cost={post.cost}
                    isLiked={post.isLiked}
                    token={token}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
};

export default LikedPost;
