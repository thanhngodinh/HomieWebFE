import { FC, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import React, { useState } from 'react';
import { storage } from '../../firebase/imgConfig';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Post, HostelCreate, Utilities } from '../../models/hostel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { createHostel, updatePost } from '../../redux/hostel/slice';
import { District, Province, Ward } from '../../models';
import uuid from 'react-uuid';
import { useRouter } from 'next/router';
import { Button, Form, InputNumber, Select } from 'antd';
import { SelectProps, Input } from 'antd';
import { getUtilitiess, selectUtilitiess } from '../../redux/utilities/slice';
import { Address, Coord } from './EditPost';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validate';
import { FormItem } from 'react-hook-form-antd';
import Link from 'next/link';

interface BasicInforProps {
  hostel: HostelCreate;
  coord?: Coord;
  getAddress?: (address: Address) => void;
}

const { TextArea } = Input;

const BasicInformation: FC<BasicInforProps> = ({
  hostel,
  getAddress,
  coord,
}) => {
  const [form] = Form.useForm();

  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { listUtilities } = useSelector(selectUtilitiess);

  const [province, setProvince] = useState<Province[]>([]);
  const [district, setDistrict] = useState<District[]>([]);
  const [ward, setWard] = useState<Ward[]>([]);
  const [imagesPreview, setImagesPreview] = useState<string[]>([]);
  const [imagesFile, setImagesFile] = useState<File[]>([]);

  let filesPreview: string[] = [];
  const listUtilitiesOpt: SelectProps['options'] = listUtilities?.map(
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
    getValues,
    watch,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<HostelCreate>({
    defaultValues: useMemo(() => {
      console.log('post has changed', hostel);
      return hostel;
    }, [hostel]),
    resolver: yupResolver(schema),
  });

  const watchAddress = watch(['province', 'district', 'ward', 'street']);

  const onSubmit = (data: HostelCreate) => {
    console.log(coord?.longitude, coord?.latitude);
    console.log('data', data);
    handleSelectedFile(imagesFile).then((res: string[]) => {
      dispatch(
        updatePost({
          data: {
            ...data,
            imageUrl: hostel.imageUrl.concat(res),
            longitude: coord?.longitude.toString(),
            latitude: coord?.latitude.toString(),
          },
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
    if (hostel?.imageUrl) {
      setImagesPreview(hostel?.imageUrl);
    }
  }, [hostel?.imageUrl]);

  useEffect(() => {
    if (getAddress)
      getAddress({
        province: watchAddress[0],
        district: watchAddress[1],
        ward: watchAddress[2],
        street: watchAddress[3],
      });
  }, [JSON.stringify(watchAddress)]);

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

  const onSelectProvince = (valueSelect: string) => {
    const provinceSelected = province.find((p) => p.name === valueSelect);
    if (provinceSelected) {
      getDistrict(provinceSelected.code);
    }
  };

  const onSelectDistrict = (valueSelect: string) => {
    const districtSelected = district.find((p) => p.name === valueSelect);
    if (districtSelected) {
      getWard(districtSelected.code);
    }
  };

  const filterOption = (inputValue: string, option: any) => {
    return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  return (
    <div className="relative text-xs w-full px-6 pt-4 pb-12 m-auto bg-white rounded-md shadow-xl ring-2 lg:max-w-xl">
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit(onSubmit)}
        // onValuesChange={handleFormValueChange}
      >
        <div className="block mb-2">
          <p className="text-lg font-semibold text-indigo-700 leading-relaxed">
            Thông tin cơ bản
          </p>
        </div>

        <FormItem
          name="type"
          label="Loại nhà"
          control={control}
          required={true}
        >
          <Select
            size="large"
            allowClear
            style={{ width: '100%' }}
            placeholder="Hãy chọn loại nhà"
            onChange={(value: string[]) => setValue('utilities', value)}
            options={[
              { value: 'Ký túc xá', label: 'Ký túc xá' },
              { value: 'Phòng cho thuê', label: 'Phòng cho thuê' },
              { value: 'Nhà nguyên căn', label: 'Nhà nguyên căn' },
              { value: 'Phòng ở ghép', label: 'Phòng ở ghép' },
              { value: 'Căn hộ', label: 'Căn hộ' },
            ]}
          />
        </FormItem>

        <div className="w-full mb-6">
          <FormItem
            name="province"
            label="Tỉnh/Thành phố"
            control={control}
            required={true}
          >
            <Select
              size="large"
              showSearch
              style={{ width: '100%' }}
              onSelect={onSelectProvince}
              placeholder="Hãy nhập Tỉnh / Thành phố"
              filterOption={filterOption}
              options={province?.map((item: any, i) => {
                return {
                  ...item,
                  value: item.name,
                  label: item.name,
                };
              })}
            />
          </FormItem>
        </div>

        <div className="w-full mb-6">
          <FormItem
            name="district"
            label="Quận / Huyện"
            control={control}
            required={true}
          >
            <Select
              size="large"
              showSearch
              style={{ width: '100%' }}
              onSelect={onSelectDistrict}
              placeholder="Hãy nhập Quận / Huyện"
              filterOption={filterOption}
              options={district?.map((item: any, i) => {
                return {
                  ...item,
                  value: item.name,
                  label: item.name,
                };
              })}
            />
          </FormItem>
        </div>

        <div className="w-full mb-6">
          <FormItem
            name="ward"
            label="Phường / Xã"
            control={control}
            required={true}
          >
            <Select
              size="large"
              showSearch
              style={{ width: '100%' }}
              onSelect={onSelectDistrict}
              placeholder="Hãy nhập Phường / Xã"
              filterOption={filterOption}
              options={ward?.map((item: any, i) => {
                return {
                  ...item,
                  value: item.name,
                  label: item.name,
                };
              })}
            />
          </FormItem>
        </div>

        <FormItem name="street" label="Đường" control={control}>
          <Input size="large" placeholder="Hãy nhập Đường" />
        </FormItem>

        <FormItem
          name="area"
          label="Diện tích"
          required={true}
          control={control}
        >
          <InputNumber
            size="large"
            controls={false}
            style={{ width: '100%' }}
            placeholder="Hãy nhập Diện tích"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>

        <FormItem
          name="capacity"
          label="Sức chứa"
          required={true}
          control={control}
        >
          <InputNumber
            size="large"
            controls={false}
            min={1}
            max={100}
            style={{ width: '100%' }}
            placeholder="Hãy nhập Sức chứa"
          />
        </FormItem>

        <FormItem
          name="cost"
          label="Tiền thuê"
          required={true}
          control={control}
        >
          <InputNumber
            size="large"
            controls={false}
            style={{ width: '100%' }}
            placeholder="Hãy nhập Tiền thuê"
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>
        <FormItem
          name="deposit"
          label="Tiền cọc"
          required={true}
          control={control}
        >
          <InputNumber
            size="large"
            controls={false}
            style={{ width: '100%' }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>

        <FormItem name="electricityPrice" label="Tiền điện" control={control}>
          <InputNumber
            size="large"
            controls={false}
            style={{ width: '100%' }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>
        <FormItem name="waterPrice" label="Tiền nước" control={control}>
          <InputNumber
            size="large"
            controls={false}
            style={{ width: '100%' }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>
        <FormItem name="parkingPrice" label="Tiền giữ xe" control={control}>
          <InputNumber
            size="large"
            controls={false}
            style={{ width: '100%' }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>
        <FormItem name="servicePrice" label="Tiền phí khác" control={control}>
          <InputNumber
            size="large"
            controls={false}
            style={{ width: '100%' }}
            formatter={(value) =>
              `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
            }
            parser={(value) => value!.replace(/\$\s?|(,*)/g, '')}
          />
        </FormItem>

        <FormItem name="utilities" label="Tiện ích" control={control}>
          <Select
            size="large"
            mode="multiple"
            allowClear
            style={{ width: '100%' }}
            placeholder="Hãy chọn Tiện ích"
            onChange={(value: string[]) => setValue('utilities', value)}
            options={listUtilitiesOpt}
          />
        </FormItem>

        <div className="block mb-2 mt-6">
          <p className="text-lg font-semibold text-indigo-700 leading-relaxed">
            Thông tin bài viết
          </p>
        </div>

        <FormItem name="name" label="Tiêu đề" required={true} control={control}>
          <Input size="large" placeholder="Hãy nhập Tiêu đề" />
        </FormItem>

        <FormItem
          name="description"
          label="Mô tả"
          required={true}
          control={control}
        >
          <TextArea
            size="large"
            rows={5}
            placeholder="Hãy nhập Mô tả cho bài đăng"
          />
        </FormItem>

        <div className="block mb-2 mt-6">
          <p className="text-lg font-semibold text-indigo-700 leading-relaxed">
            Hình ảnh
          </p>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3 mb-6 md:mb-0">
            <Input
              size="large"
              id="img"
              type="file"
              multiple
              onChange={(files: any) => {
                handlePreviewImage(files.target.files);
              }}
            />

            {errors.imageUrl && (
              <p className="text-red-500 text-xs italic mt-4">
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
        <div className="absolute right-6 bottom-4">
          <Link href="/my/post">
            <Button className="button button__border">Hủy</Button>
          </Link>

          <Button htmlType="submit" className="button button__fill ml-8">
            Lưu
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BasicInformation;
