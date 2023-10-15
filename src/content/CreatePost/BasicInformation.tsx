import { FC, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './CreatePost.module.scss';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { storage } from '../../app/firebaseConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Hostel, HostelCreate, Utilities } from '../../models/hostel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { createHostel } from '../../redux/hostel/slice';
import { District, Province, Ward } from '../../models';
import uuid from 'react-uuid';
import { useRouter } from 'next/router';
import { Select } from 'antd';
import type { SelectProps } from 'antd';
import { getUtilitiess, selectUtilitiess } from '../../redux/utilities/slice';

const cx = classNames.bind(styles);

interface BasicInforProps {}

const BasicInformation: FC<BasicInforProps> = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  // const { loading, error } = useSelector(createHostel);
  const { listUtilities } = useSelector(selectUtilitiess);

  const [province, setProvince] = useState<Province[]>([]);
  const [district, setDistrict] = useState<District[]>([]);
  const [ward, setWard] = useState<Ward[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imagesFile, setImagesFile] = useState<File[]>([]);

  let filesPreview: string[] = [];
  const listUtilitiesOpt: SelectProps['options'] = listUtilities.map(
    (u: Utilities) => {
      return {
        label: u.name,
        value: u.id,
      };
    }
  );

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<HostelCreate>({
    defaultValues: {
      capacity: 1,
      deposit: 0,
      electricityPrice: 0,
      waterPrice: 0,
      parkingPrice: 0,
      servicePrice: 0,
    },
  });

  const onSubmit = (data: HostelCreate) => {
    handleSelectedFile(imagesFile).then((res) => {
      dispatch(
        createHostel({
          param: { ...data, imageUrl: res },
          callback: () => router.push('/my/post'),
        })
      );
    });
  };

  const getProvince = () => {
    fetch('https://provinces.open-api.vn/api/p')
      .then((res) => res.json())
      .then((data: Province[]) => {
        setProvince(data);
        setValue('province', data[0].name);
      });
  };
  const getDistrict = (id: number) => {
    fetch(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
      .then((res) => res.json())
      .then((data: Province) => {
        setDistrict(data?.districts);
        setValue('district', data?.districts[0]?.name);
        getWard(data?.districts[0]?.code);
      });
  };
  const getWard = (id: number) => {
    fetch(`https://provinces.open-api.vn/api/d/${id}?depth=2`)
      .then((res) => res.json())
      .then((data: District) => {
        setWard(data?.wards);
        setValue('ward', data?.wards[0]?.name || '');
      });
  };

  useEffect(() => {
    dispatch(getUtilitiess());
  }, [dispatch]);

  useEffect(() => {
    getProvince();
    getDistrict(1);
  }, []);

  const handlePreviewImage = (files: File[]) => {
    for (let i = 0; i < files.length; i++) {
      filesPreview.push(URL.createObjectURL(files[i]));
    }
    setImagesFile(files);
    setImagesPreview(filesPreview);
  };

  const handleSelectedFile = (files: File[]): Promise<any> => {
    let uploadProgress = [];
    for (let i = 0; i < files.length; i++) {
      if (files[i].size < 10000000) {
        if (files[i]) {
          const uploadPromise = new Promise((resolve, reject) => {
            const name = files[i].name;
            const storageRef = ref(storage, `image/${name + uuid()}`);
            const uploadTask = uploadBytesResumable(storageRef, files[i]);
            uploadTask.on(
              'state_changed',
              (snapshot: any) => {
                const progress =
                  (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                switch (snapshot.state) {
                  case 'paused':
                    console.log(`Upload file ${i} is paused`);
                    break;
                  case 'running':
                    console.log(`Upload file ${i} is running`);
                    break;
                }
              },
              (error: any) => {
                console.log(error.message);
                reject(error);
              },
              () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url: string) => {
                  resolve(url);
                });
              }
            );
          });
          uploadProgress.push(uploadPromise);
        } else {
          console.log('File not found');
        }
      } else {
        console.log('File size to large');
      }
    }
    if (uploadProgress.length > 0) {
      return Promise.all(uploadProgress);
    } else {
      return Promise.resolve([]);
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
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  onChange={(e) => {
                    getDistrict(JSON.parse(e.target.value)?.code);
                    setValue('province', JSON.parse(e.target.value).name);
                  }}
                >
                  {province?.map((item: any, i) => (
                    <option key={i} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
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
                  // {...register('district', { required: true })}
                  onChange={(e) => {
                    getWard(JSON.parse(e.target.value)?.code);
                    setValue('district', JSON.parse(e.target.value)?.name);
                  }}
                >
                  {district?.map((item: any, i) => (
                    <option key={i} value={JSON.stringify(item)}>
                      {item.name}
                    </option>
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
                  // {...register('ward', { required: false })}
                  onChange={(e) => {
                    setValue('ward', JSON.parse(e.target.value)?.name);
                  }}
                >
                  {ward?.map((item: any, i) => (
                    <option key={i} value={JSON.stringify(item)} id={item.code}>
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
                {...register('area', {
                  required: true,
                  valueAsNumber: true,
                  pattern: {
                    value: /[1-9][0-9]{1,}/,
                    message: 'Hãy nhập đúng dạng số',
                  },
                })}
              />
              {errors.area && (
                <p className="text-red-500 text-xs italic">
                  Hãy điền diện tích
                </p>
              )}
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
                placeholder="Giá phòng"
                {...register('cost', {
                  required: true,
                  valueAsNumber: true,
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
            </div>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Tiền cọc
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Tiền cọc"
                {...register('deposit', {
                  valueAsNumber: true,
                  pattern: {
                    value: /[1-9][0-9]{1,}/,
                    message: 'Hãy nhập đúng dạng số',
                  },
                })}
              />
              {errors.deposit && (
                <p className="text-red-500 text-xs italic">
                  Hãy điền giá phòng
                </p>
              )}
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
                placeholder="Giá điện"
                {...register('electricityPrice', {
                  valueAsNumber: true,
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
                  valueAsNumber: true,
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
                Giá giữ xe
              </label>
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Giá xe"
                {...register('parkingPrice', {
                  valueAsNumber: true,
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
                placeholder="Giá dịch vụ"
                {...register('servicePrice', {
                  valueAsNumber: true,
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
              <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Sức chứa"
                {...register('capacity', {
                  valueAsNumber: true,
                  pattern: {
                    value: /[1-9][0-9]{1,}/,
                    message: 'Hãy nhập đúng dạng số',
                  },
                })}
              />
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
              <Select
                size="large"
                mode="multiple"
                allowClear
                style={{ width: '100%' }}
                placeholder="Please select"
                onChange={(value: string[]) => setValue('utilities', value)}
                options={listUtilitiesOpt}
                // {...register('utilities', { required: false })}
              />
              {/* <input
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
                id="grid-first-name"
                type="text"
                placeholder="Tiện ích khác"
              /> */}
            </div>
          </div>

          <div className="block mb-2 mt-6">
            <p className="text-lg font-semibold text-indigo-700 leading-relaxed">
              Thông tin bài viết
            </p>
          </div>

          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label
                className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                htmlFor="grid-first-name"
              >
                Tiêu đề
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
                {...register('phone', { required: true })}
              />
              {errors.phone && (
                <p className="text-red-500 text-xs italic">
                  Hãy điền Số điện thoại
                </p>
              )}
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
                onChange={(files: any) => {
                  handlePreviewImage(files.target.files);
                }}
              />

              {errors.imageUrl && (
                <p className="text-red-500 text-xs italic">
                  Hãy điền chọn Ảnh của phòng
                </p>
              )}
            </div>
            <div className="grid grid-cols-3 gap-2 px-3">
              {imagesPreview?.map((img, i) => {
                return (
                  <img
                    key={i}
                    src={img}
                    alt="preview"
                    className="h-44 object-cover rounded"
                  />
                );
              })}
            </div>
          </div>

          <div className="flex items-center justify-between mt-5">
            <button
              className="bg-transparent hover:bg-indigo-100 text-black font-bold py-2 px-4 border-solid border-indigo rounded shadow py-2 px-4 border border-blue-500 hover:border-transparent rounded"
              type="button"
            >
              Quay lại
            </button>
            <div>
              <input
                className="bg-indigo-500 hover:bg-indigo-300 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BasicInformation;
