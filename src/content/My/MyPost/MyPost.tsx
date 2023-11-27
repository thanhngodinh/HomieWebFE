import { FC, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './MyPost.module.scss';
import PostItem from '../../../components/PostItem';
import SubHeader from '../../../components/SubHeader';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import { getMyPosts, selectUsers } from '../../../redux/user/slice';
import { Post } from '../../../models';

const cx = classNames.bind(styles);

interface MyPostProps {}

const MyPost: FC<MyPostProps> = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { posts, loading, error } = useSelector(selectUsers);

  useEffect(() => {
    dispatch(getMyPosts());
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
      <div className="container mx-auto  my-12">
        <div className={cx('mypost')}>
          {posts?.map((post: any) => {
            return (
              <>
                <div className="py-4 border-t-4  border-b-4">
                  <PostItem
                    key={post.id}
                    id={post.id}
                    img={post?.imageUrl[0]}
                    name={post.name}
                    code={post.id}
                    startDate={post.createdAt}
                    endDate={post.endedAt}
                    status={post.status}
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

export default MyPost;
