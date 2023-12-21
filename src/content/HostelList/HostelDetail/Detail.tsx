import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Detail.module.scss';
import Carousel from 'react-material-ui-carousel';
import { Carousel as Carousel2, Rate as AntdRate, Button } from 'antd';
import React from 'react';
import SuggestItemBasic from '../../../components/SuggestItemBasic';
import Link from 'next/link';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import {
  getHostelById,
  getHostelSuggest,
  likePost,
  ratePost,
  selectHostels,
} from '../../../redux/hostel/slice';
import {
  getUtilitiess,
  selectUtilitiess,
} from '../../../redux/utilities/slice';
import { useRouter } from 'next/router';
// import { useParams } from 'next/navigation';
import {
  GenAddress,
  GenCurrecy,
  GetUtility,
  formatGoogleAddress,
} from '../../../utils/func';
import { Input } from 'antd';
import Review from '../../../components/Review';
import { Rate } from '../../../models/rate';
import { flatMap } from 'lodash';
import { Condition, addDocument, getDocument } from '../../../firebase/service';
import { selectAuths } from '../../../redux/auth/slice';
import { getMyProfile, selectUsers } from '../../../redux/user/slice';
import {
  faBookAtlas,
  faHeart,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { faHeart as noheart } from '@fortawesome/free-regular-svg-icons';
import Map from '../../../components/Map';

const cx = classNames.bind(styles);

interface HostelDetailProps {}

const { TextArea } = Input;

const HostelDetail: FC<HostelDetailProps> = (props) => {
  const router = useRouter();
  const id = router.query.id as string;

  const [token, setToken] = useState('');
  const [showMap, setShowMap] = useState(false);
  const [comment, setComment] = useState('');
  const [star, setStar] = useState<number>();
  const [isLiked, setIsLiked] = useState(false);
  const [isShowPhone, setIsShowPhone] = useState(false);

  const dispatch = useDispatch<AppDispatch>();

  const { hostel, listSuggest, loading, error } = useSelector(selectHostels);
  const { profile } = useSelector(selectUsers);

  const { listUtilities } = useSelector(selectUtilitiess);

  useEffect(() => {
    if (id) {
      dispatch(getHostelById(id));
      dispatch(getUtilitiess());
      dispatch(getHostelSuggest());
      dispatch(getMyProfile());
    }
  }, [dispatch, id]);

  useEffect(() => {
    setIsLiked(hostel?.isLiked);
  }, [loading]);

  useEffect(() => {
    let value = sessionStorage.getItem('token') || '';
    setToken(value);
  }, []);

  const onRateChange = () => {
    if (star) {
      dispatch(ratePost({ postId: id, star: star, comment: comment })).finally(
        () => {
          router.reload();
        }
      );
    }
  };

  const onLikeChange = () => {
    setIsLiked(!isLiked);
    dispatch(likePost(id));
  };

  const handleChatWithAuthor = async (author: {
    id: string;
    name: string;
    avatar: string;
  }) => {
    if (!profile) return;
    try {
      const condition: Condition = {
        fieldName: 'id',
        operator: '==',
        value: author.id,
      };
      console.log(75, author);
      const roomIsExist = await getDocument('rooms', condition);
      if (roomIsExist.empty) {
        const docRef = await addDocument('rooms', {
          keyUserId: profile.id,
          keyUserName: profile.name,
          keyUserAvatar: profile.avatar,
          id: author.id,
          name: author.name,
          avatar: author.avatar,
        });
        if (docRef) router.push(`/chat/${docRef.id}`);
      } else {
        roomIsExist.forEach((doc) => {
          router.push(`/chat/${doc.id}`);
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className=" container mx-auto phone:mx-4 phonel:mx-auto sm:mx-auto md:mx-auto">
      <div className="relative grid grid-cols-2 gap-4 mb-4">
        <div
          className={`relative bg-slate-50 rounded-lg phone:col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1 ${
            !showMap ? 'pt-8' : ''
          }`}
        >
          {!showMap && hostel?.imageUrl && (
            <Carousel
              autoPlay={true}
              stopAutoPlayOnHover={true}
              animation={'slide'}
            >
              {[
                ...hostel?.imageUrl?.map((image: string, i: number) => {
                  return (
                    <img
                      className="h-96 object-cover mx-auto"
                      src={image}
                      key={i}
                    />
                  );
                }),
              ]}
            </Carousel>
          )}

          {showMap && (
            <Map
              height="500"
              address={
                formatGoogleAddress({
                  province: hostel?.province,
                  district: hostel?.district,
                  ward: hostel?.ward,
                  street: hostel?.street,
                }) || ''
              }
            ></Map>
          )}

          {token ? (
            isLiked ? (
              <div className="absolute right-4 top-2 z-10">
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{ color: '#eb0a0a' }}
                  onClick={onLikeChange}
                />
              </div>
            ) : (
              <div className="absolute right-4 top-2 z-10">
                <FontAwesomeIcon icon={noheart} onClick={onLikeChange} />
              </div>
            )
          ) : (
            <div className="absolute right-4 top-2 z-10">
              <Link href={'/login'}>
                <FontAwesomeIcon icon={noheart} />
              </Link>
            </div>
          )}
        </div>

        <div className="px-6 pt-4 text-black phone:col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1">
          <div className="text-4xl font-bold mb-4">{hostel?.name}</div>

          <div className="my-5">
            <div className="flex flex-start gap-4">
              <p className="text-xl font-semibold mb-5">Thông tin cơ bản</p>
              <Button
                htmlType="button"
                className="buttonIcon buttonIcon__border"
                onClick={() => setShowMap(!showMap)}
                size="small"
              >
                {!showMap ? (
                  <FontAwesomeIcon icon={faBookAtlas} size="xs" />
                ) : (
                  <FontAwesomeIcon icon={faMapLocationDot} size="xs" />
                )}
              </Button>
            </div>
            <div>
              <p className="text-gray-500 text-sm">Địa chỉ</p>
              <p className="text-sm">
                {GenAddress(
                  hostel?.street,
                  hostel?.ward,
                  hostel?.district,
                  hostel?.province
                )}
              </p>
            </div>
            <div className="mt-2 grid grid-cols-4">
              {hostel?.capacity && (
                <div className="mt-2 phone:col-span-2 sm:col-span-1">
                  <p className="text-gray-500 text-sm">Sức chứa</p>
                  <p className="text-sm">{`${hostel?.capacity} người`}</p>
                </div>
              )}
              {hostel?.area && (
                <div className="mt-2">
                  <p className="text-gray-500 text-sm">Diện tích</p>
                  <p className="text-sm">{`${hostel?.area} mét vuông`}</p>
                </div>
              )}
            </div>
            <div className="mt-2 grid grid-cols-4">
              <div className="mt-2 phone:col-span-2 sm:col-span-1">
                <p className="text-gray-500 text-sm">Giá phòng</p>
                <p className="text-sm">{GenCurrecy(hostel?.cost)}</p>
              </div>
              <div className="mt-2">
                <p className="text-gray-500 text-sm">Tiền cọc</p>
                <p className="text-sm">{GenCurrecy(hostel?.deposit)}</p>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-4 phone:gap-5 sm:gap-0">
              {hostel?.electricityPrice && (
                <div>
                  <p className="text-gray-500 text-sm">Tiền điện</p>
                  <p className="text-sm">
                    {GenCurrecy(hostel?.electricityPrice)}
                  </p>
                </div>
              )}
              {hostel?.waterPrice && (
                <div className="">
                  <p className="text-gray-500 text-sm">Tiền nước</p>
                  <p className="text-sm">{GenCurrecy(hostel?.waterPrice)}</p>
                </div>
              )}
              {hostel?.parkingPrice && (
                <div className="">
                  <p className="text-gray-500 text-sm">Tiền xe</p>
                  <p className="text-sm">{GenCurrecy(hostel?.parkingPrice)}</p>
                </div>
              )}

              {hostel?.servicePrice && (
                <div>
                  <p className="text-gray-500 text-sm">Tiền dịch vụ</p>
                  <p className="text-sm">{GenCurrecy(hostel?.servicePrice)}</p>
                </div>
              )}
            </div>
          </div>

          {/* rating */}
          <div className="py-4 ">
            <div className="flex flex-row">
              <div className="flex-1 mr-6">
                <table className="w-full border-collapse border-spacing-0">
                  <tbody>
                    <tr>
                      <td className="w-[20px] text-[#70757a] text-sm">5</td>
                      <td className="pl-1">
                        <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                          <div
                            style={{
                              paddingLeft:
                                (hostel?.rateInfo?.star5 * 100) /
                                  Math.max(
                                    hostel?.rateInfo?.star1,
                                    hostel?.rateInfo?.star2,
                                    hostel?.rateInfo?.star3,
                                    hostel?.rateInfo?.star4,
                                    hostel?.rateInfo?.star5
                                  ) +
                                '%',
                            }}
                            className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                          ></div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="w-[20px] text-[#70757a] text-sm">4</td>
                      <td className="pl-1">
                        <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                          <div
                            style={{
                              paddingLeft:
                                (hostel?.rateInfo?.star4 * 100) /
                                  Math.max(
                                    hostel?.rateInfo?.star1,
                                    hostel?.rateInfo?.star2,
                                    hostel?.rateInfo?.star3,
                                    hostel?.rateInfo?.star4,
                                    hostel?.rateInfo?.star5
                                  ) +
                                '%',
                            }}
                            className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                          ></div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="w-[20px] text-[#70757a] text-sm">3</td>
                      <td className="pl-1">
                        <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                          <div
                            style={{
                              paddingLeft:
                                (hostel?.rateInfo?.star3 * 100) /
                                  Math.max(
                                    hostel?.rateInfo?.star1,
                                    hostel?.rateInfo?.star2,
                                    hostel?.rateInfo?.star3,
                                    hostel?.rateInfo?.star4,
                                    hostel?.rateInfo?.star5
                                  ) +
                                '%',
                            }}
                            className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                          ></div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="w-[20px] text-[#70757a] text-sm">2</td>
                      <td className="pl-1">
                        <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                          <div
                            style={{
                              paddingLeft:
                                (hostel?.rateInfo?.star2 * 100) /
                                  Math.max(
                                    hostel?.rateInfo?.star1,
                                    hostel?.rateInfo?.star2,
                                    hostel?.rateInfo?.star3,
                                    hostel?.rateInfo?.star4,
                                    hostel?.rateInfo?.star5
                                  ) +
                                '%',
                            }}
                            className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                          ></div>
                        </div>
                      </td>
                    </tr>

                    <tr>
                      <td className="w-[20px] text-[#70757a] text-sm">1</td>
                      <td className="pl-1">
                        <div className="h-[8px] rounded bg-[#f1f3f4] overflow-hidden">
                          <div
                            style={{
                              paddingLeft:
                                (hostel?.rateInfo?.star1 * 100) /
                                  Math.max(
                                    hostel?.rateInfo?.star1,
                                    hostel?.rateInfo?.star2,
                                    hostel?.rateInfo?.star3,
                                    hostel?.rateInfo?.star4,
                                    hostel?.rateInfo?.star5
                                  ) +
                                '%',
                            }}
                            className="bg-[#786fa6] border-[#786fa6] border-4 rounded w-0"
                          ></div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-0 text-center align-top">
                <div className="text-6xl bold">{hostel?.rateInfo?.avgRate}</div>
                <div className="text-[#70757a] text-xs">
                  {hostel?.rateInfo?.total +
                    (hostel?.rateInfo?.total > 1 ? ' reviews' : ' review')}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="h-auto w-full grid grid-cols-3 gap-4 border-t border-solid border-[#70757a]">
        <div className="col-span-2 phone:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-2 ">
          <div className="py-5">
            {hostel?.description && (
              <div className="my-5">
                <p className="text-xl font-semibold">Mô tả</p>
                <p className="text-sm mt-4 whitespace-pre-wrap break-all">
                  {hostel?.description}
                </p>
              </div>
            )}
          </div>
          <div className="py-5">
            <p className="text-xl font-semibold">Các tiện ích khác</p>

            <div className="grid grid-cols-3 gap-2 mt-4">
              {hostel?.utilities?.map((utility: string) => {
                let u = GetUtility(utility, listUtilities);
                return (
                  u && (
                    <div className="">
                      <FontAwesomeIcon icon={u.icon} size="xs" />
                      <span className="text-sm ml-2 font-semibold">
                        {u.name}
                      </span>
                    </div>
                  )
                );
              })}
            </div>
          </div>
        </div>
        {/* Author card */}
        <div className=" w-full border border-solid  border-[#70757a] content-center py-2 flex items-center justify-center phone:col-span-3 sm:col-span-3 md:col-span-3 lg:col-span-1 ">
          <div className="">
            <div className="w-full mb-4 ">
              <img
                height={64}
                width={64}
                className="rounded-full mx-auto "
                src={hostel?.authorAvatar}
              />
            </div>
            <p className="text-sm text-center mb-2  ">
              {'Đăng bởi ' + hostel?.authorName}
            </p>
            <div className="cursor-pointer  text-center mb-2">
              <Link href={'/users/' + hostel?.createdBy}>
                <p className="text-sm ml-2 text-gray-500 text-center">
                  {'Xem thêm các tin khác từ ' + hostel?.authorName}
                </p>
              </Link>
            </div>
            <div className=" text-center mb-2">
              {token ? (
                <button
                  type="button"
                  className="button button__fill button__fill-large text__normal"
                  onClick={() => setIsShowPhone(!isShowPhone)}
                >
                  {isShowPhone
                    ? 'Liên hệ ' + hostel?.phone
                    : 'Bấm để xem số điện thoại'}
                </button>
              ) : (
                <Link href={'/login'}>
                  <button
                    type="button"
                    className="button button__fill button__fill-large text__normal"
                    onClick={() => setIsShowPhone(!isShowPhone)}
                  >
                    Bấm để xem số điện thoại
                  </button>
                </Link>
              )}
            </div>
            <div className=" m-auto text-center">
              {token ? (
                <button
                  type="button"
                  className="button button__border button__border-large text__normal"
                  onClick={(e) =>
                    handleChatWithAuthor({
                      id: hostel.authorId,
                      name: hostel.authorName,
                      avatar: hostel.authorAvatar,
                    })
                  }
                >
                  Chat với người đăng
                </button>
              ) : (
                <Link href={'/login'}>
                  <button
                    type="button"
                    className="button button__border button__border-large text__normal"
                  >
                    Chat với người đăng
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* rating form  */}
      <div className="p-4 border-t border-solid border-[#70757a] grid grid-cols-2 gap-4">
        <form
          action=""
          className="phone:col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1"
        >
          <div className="text-2xl font-bold mb-4 text-center">
            Nói với mọi người về đánh giá của bạn
          </div>
          <div className="text-center">
            <AntdRate
              value={star}
              onChange={(value) => {
                setStar(value);
              }}
              style={{ fontSize: 40 }}
            />
          </div>
          <div className="py-4">
            <TextArea
              value={comment}
              onChange={(e) => {
                setComment(e.target.value);
              }}
              rows={8}
            />
          </div>
          <div className="text-center">
            <button
              disabled={star ? false : true}
              type="button"
              className={cx(
                'button',
                'button__fill',
                'button__fill-large',
                'text-sm',
                star ? 'bg-[#786fa6]' : '!bg-[#dddddd] cursor-not-allowed'
              )}
              onClick={onRateChange}
            >
              Đăng
            </button>
          </div>
        </form>
        <div className="p-6 phone:col-span-2 sm:col-span-2 md:col-span-2 lg:col-span-1  ">
          {hostel?.rateInfo?.rateList?.map((r: Rate) => {
            return <Review rate={r} />;
          })}
        </div>
      </div>

      {/* reviews */}

      {/* Suggest */}
      {listSuggest && (
        <div className="mt-10">
          <p className="text-xl font-semibold">Gợi ý của chúng tôi</p>
          <div className="">
            <Carousel2 autoplay slidesToShow={4}>
              {[
                ...listSuggest.map((hostel: any, i: any) => {
                  return (
                    <div key={i} className="p-2 mb-4">
                      <SuggestItemBasic
                        link={`${hostel.id}`}
                        img={hostel.imageUrl[0]}
                        title={hostel.name}
                        address={GenAddress(
                          hostel.street,
                          hostel.ward,
                          hostel.district,
                          hostel.province
                        )}
                        cost={hostel.cost}
                      />
                    </div>
                  );
                }),
              ]}
            </Carousel2>
          </div>
        </div>
      )}
    </div>
  );
};

export default HostelDetail;
