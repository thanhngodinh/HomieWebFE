import { FC, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { storage } from '../../app/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Hostel } from '../../models/hostel';

const cx = classNames.bind(styles);

interface BasicInforProps {}

type FormValues = {
  name: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  postType: string;
  status: string;
  cost: number;
  electricityPrice: number;
  waterPrice: number;
  parkingPrice: number;
  wifiPrice: number;
  capacity: number;
  area: number;
  description: string;
  images: string[];
  utilities: string[];
};

const BasicInformation: FC<BasicInforProps> = (props) => {
  // return <div className={cx('wrapper')}>Create Post</div>;
  const [province, setProvince] = useState([]);
  const [district, setDistrict] = useState([]);
  const [ward, setWard] = useState([]);
  const [isDisableButton, setIsDisableButton] = useState(true);
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [imagesURL, setImagesURL] = useState<string[]>([]);
  const [progressUpload, setProgressUpload] = useState(0);

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = handleSubmit((data: any) => {
    const province = JSON.parse(data.province)?.name;
    const district = JSON.parse(data.district)?.name;
    const ward = JSON.parse(data.ward)?.name;
    console.log({ ...data, province, district, ward });
  });

  const getProvince = () => {
    fetch('https://provinces.open-api.vn/api/p')
      .then((res) => res.json())
      .then((data) => {
        setProvince(data);
      });
  };
  const getDistrict = (id: any) => {
    fetch(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setDistrict(data?.districts);
      });
  };
  const getWard = (id: any) => {
    fetch(`https://provinces.open-api.vn/api/d/${id}?depth=2`)
      .then((res) => res.json())
      .then((data) => {
        setWard(data?.wards);
      });
  };
  useEffect(() => {
    getProvince();
    getDistrict(1);
    getWard(1);
  }, []);

  useEffect(() => {
    console.log(imagesURL);
    setValue('images', imagesURL, {
      shouldDirty: true,
    });
    setIsDisableButton(false);
  }, [imagesURL]);

  const handleSelectedFile = (files: any) => {
    if (files) {
      for (const image of files) {
        if (image.size < 10000000) {
          if (image) {
            const name = image.name;
            const storageRef = ref(storage, `image/${name}`);
            const uploadTask = uploadBytesResumable(storageRef, image);

            uploadTask.on(
              'state_changed',
              (snapshot: any) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

                setProgressUpload(progress); // to show progress upload

                switch (snapshot.state) {
                  case 'paused':
                    console.log('Upload is paused');
                    break;
                  case 'running':
                    console.log('Upload is running');
                    break;
                }
              },
              (error: any) => {
                console.log(error.message);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
                  //url is download url of file
                  setImagesURL([...imagesURL, url]);
                });
              }
            );
          } else {
            console.log('File not found');
          }
        } else {
          console.log('File size to large');
        }
      }
    }
  };

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden ">
      <div>Để mọi người cùng biết</div>
      <div>
        Bạn có nhà muốn cho thuê nhưng chưa có kênh? Hãy viết vài dòng để đưa
        mọi người đến nhà của bạn nhé.
      </div>
      <div className="mt-6 mb-8 text-xs w-full p-6 m-auto bg-white rounded-md shadow-xl ring-2 lg:max-w-xl">
        <form className="">
          <div className="block mb-2">
            <p className="text-lg font-semibold text-indigo-700 leading-relaxed">
              Thông tin cơ bản
            </p>
          </div>

          {/* <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Loại tin đăng
              </label>

              <input
                id="home1"
                value="forRent"
                className="mr-1"
                type="radio"
                {...register('postType', { required: true })}
              />
              <label htmlFor="home1" className="">
                Tin ở ghép
              </label>

              <input
                id="home2"
                value="findHome"
                className="ml-3 mr-1"
                type="radio"
                aria-labelledby="home2"
                aria-describedby="home2"
                {...register('postType', { required: true })}
              />
              <label htmlFor="home2" className="">
                Tin nhà ở
              </label>
              {errors.postType && (
                <p className="text-red-500 text-xs italic">
                  Hãy chọn loại bài đăng
                </p>
              )}
            </div>
          </div> */}

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Tỉnh / Thành phố
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  {...register('province', { required: true })}
                  onChange={(e) =>
                    getDistrict(JSON.parse(e.target.value)?.code)
                  }
                >
                  {province?.map((item: any) => (
                    <option value={JSON.stringify(item)}>{item.name}</option>
                  ))}
                </select>
                {errors.province && (
                  <p className="text-red-500 text-xs italic">
                    Hãy điền chọn Tỉnh
                  </p>
                )}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Quận / Huyện
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  {...register('district', { required: true })}
                  onChange={(e) => getWard(JSON.parse(e.target.value)?.code)}
                >
                  {district?.map((item: any) => (
                    <option value={JSON.stringify(item)}>{item.name}</option>
                  ))}
                </select>
                {errors.district && (
                  <p className="text-red-500 text-xs italic">
                    Hãy điền chọn Quận / Huyện
                  </p>
                )}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" /> */}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Phường / Xã
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  {...register('ward', { required: false })}
                >
                  {ward?.map((item: any) => (
                    <option value={JSON.stringify(item)} id={item.code}>
                      {item.name}
                    </option>
                  ))}
                </select>
                {errors.ward && (
                  <p className="text-red-500 text-xs italic">
                    Hãy điền chọn Phường / Xã
                  </p>
                )}
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" /> */}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-city"
              >
                Đường
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                id="grid-city"
                type="text"
                placeholder="Đường"
                {...register('street', { required: false })}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Diện tích
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Diện tích"
                {...register('area', { required: false })}
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Mức giá
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Mức giá"
                {...register('cost', {
                  required: true,
                  pattern: {
                    value: /[1-9][0-9]{1,}/,
                    message: 'Hãy nhập đúng dạng số',
                  },
                })}
              />
              {errors.cost && (
                <p className="text-red-500 text-xs italic">
                  Hãy điền giá phòng
                </p>
              )}
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Giá điện
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Mức giá"
                {...register('electricityPrice', {
                  required: true,
                  pattern: {
                    value: /[1-9][0-9]{1,}/,
                    message: 'Hãy nhập đúng dạng số',
                  },
                })}
              />
            </div>

            <div className="w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Giá nước
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Giá nước"
                {...register('waterPrice', {
                  required: true,
                  pattern: {
                    value: /[1-9][0-9]{1,}/,
                    message: 'Hãy nhập đúng dạng số',
                  },
                })}
              />
            </div>

            <div className="w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Giá bãi đỗ xe
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Mức giá"
                {...register('parkingPrice', {
                  required: true,
                  pattern: {
                    value: /[1-9][0-9]{1,}/,
                    message: 'Hãy nhập đúng dạng số',
                  },
                })}
              />
            </div>

            <div className="w-1/4 px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Giá dịch vụ
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Mức giá"
                {...register('cost', {
                  required: true,
                  pattern: {
                    value: /[1-9][0-9]{1,}/,
                    message: 'Hãy nhập đúng dạng số',
                  },
                })}
              />
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-last-name"
              >
                Sức chứa
              </label>
              <div className="relative">
                <select
                  className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                  id="grid-state"
                  {...register('capacity', { required: false })}
                >
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="fill-current h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                  </svg>
                </div>
              </div>
              {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-last-name" type="text" placeholder="Doe" /> */}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Tiện ích khác
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Tiện ích khác"
                {...register('utilities', { required: false })}
              />
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
          </div>

          <div className="block mb-2 mt-6">
            <p className="text-lg font-semibold text-indigo-700 leading-relaxed">
              Thông tin bài viết
            </p>
          </div>

          {/* <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Loại tin đăng
              </label>

              <input id='home1' name="home1" value="home1" className="mr-1" type="radio" />
              <label htmlFor="home1" className="">Tin ở ghép</label>


              <input id="home2" name="home1" value="home2" className="ml-3 mr-1" type="radio" aria-labelledby="home2" aria-describedby="home2" />
              <label htmlFor="home2" className="">Tin nhà ở</label>
            </div>
          </div> */}

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Tiêu đề bài đăng
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Tiêu đề bài đăng"
                {...register('name', { required: true })}
              />
              {errors.name && (
                <p className="text-red-500 text-xs italic">
                  Hãy điền Tiêu đề bài viết
                </p>
              )}
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Mô tả
              </label>
              <textarea
                className='appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name'
                rows={5}
                placeholder="Nhập mô tả chung về nhà đăng tin, ví dụ: Nhà trọ hay chung cư, gần chợ / siêu thị... "
                {...register('description', { required: true })}
              />
              {errors.description && (
                <p className="text-red-500 text-xs italic">
                  Hãy điền Mô tả cho bài viết của bạn
                </p>
              )}
              {/* <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white" id="grid-first-name" type="text" placeholder="Tên khu dân cư / dự án" /> */}
            </div>
          </div>
          {/* <div className="w-full md:w-1/2 px-3"></div> */}

          {/* <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                Tên người đăng
              </label>
              <input className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Tên người đăng" />
              <p className="text-red-500 text-xs italic">Please fill out this field.</p>
            </div>
          </div> */}

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Số điện thoại
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Số điện thoại"
                {...register('phoneNumber', { required: true })}
              />
              {errors.phoneNumber && (
                <p className="text-red-500 text-xs italic">
                  Hãy điền Số điện thoại
                </p>
              )}
              {/* <p className="text-red-500 text-xs italic">Please fill out this field.</p> */}
            </div>
          </div>

          <div className="block mb-2 mt-6">
            <p className="text-lg font-semibold text-indigo-700 leading-relaxed">
              Hình ảnh
            </p>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="file"
                multiple
                onChange={async (files: any) => {
                  handleSelectedFile(files.target.files);
                }}
                // {...register('image', { required: true })}
              />

              {errors.images && (
                <p className="text-red-500 text-xs italic">
                  Hãy điền chọn Ảnh của phòng
                </p>
              )}
            </div>
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-transparent hover:bg-indigo-100 text-black font-bold py-2 px-4 border-solid border-indigo rounded shadow py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="button"
            >
              Quay lại
            </button>
            <button
              className="bg-indigo-500 hover:bg-indigo-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              disabled={isDisableButton}
              onClick={onSubmit}
            >
              Tiếp tục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInformation;
