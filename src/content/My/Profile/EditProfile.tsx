import React, { FC, useState, useEffect, useMemo } from 'react';
import SubHeader from '../../../components/SubHeader';
import {
  AutoComplete,
  Avatar,
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Select,
} from 'antd';
import { District, HostelCreate, Province, User, Ward } from '../../../models';
import { useForm } from 'react-hook-form';
import { FormItem } from 'react-hook-form-antd';
import { yupResolver } from '@hookform/resolvers/yup';
import { schema } from './validate';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../../app/store';
import {
  getMyProfile,
  selectUsers,
  updateMyProfile,
} from '../../../redux/user/slice';

interface ProfileProps {
  profile: any;
}

const EditProfile: FC<ProfileProps> = (props) => {
  const [form] = Form.useForm();
  const [province, setProvince] = useState<Province[]>([]);
  const [district, setDistrict] = useState<District[]>([]);
  const [isFindRoommate, setIsFindRoommate] = useState(true);
  const [genderValue, setGenderValue] = useState('M');

  const dispatch = useDispatch<AppDispatch>();

  const {
    control,
    reset,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: useMemo(() => {
      console.log('profile has changed');
      return props.profile;
    }, [props.profile]),
    resolver: yupResolver(schema),
  });

  console.log(getValues());

  useEffect(() => {
    if (props.profile) {
      reset(props.profile);
    }
  }, [props.profile]);

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
      });
  };

  useEffect(() => {
    getProvince();
    getDistrict(1);
  }, []);

  const onSelectProvince = (valueSelect: string) => {
    const provinceSelected = province.find((p) => p.name === valueSelect);
    if (provinceSelected) {
      getDistrict(provinceSelected.code);
    }
  };

  const filterOption = (inputValue: string, option: any) => {
    return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  return (
    <>
      <Form
        form={form}
        name="validateOnly"
        layout="vertical"
        autoComplete="off"
        onFinish={handleSubmit(
          (data) => {
            console.log(134, data);
            dispatch(updateMyProfile(data));
          },
          (err) => console.log(134, err)
        )}
        // onValuesChange={handleFormValueChange}
      >
        <div className="flex justify-end gap-4 mb-4">
          <Button htmlType="reset" className="button button__border">
            Hủy
          </Button>
          <Button htmlType="submit" className="button button__fill">
            Lưu
          </Button>
        </div>
        <FormItem name="name" label="Họ tên" control={control} required>
          <Input />
        </FormItem>
        <FormItem name="email" label="Email" control={control} required>
          <Input />
        </FormItem>
        <FormItem name="phone" label="Số điện thoại" control={control} required>
          <Input />
        </FormItem>

        <FormItem name="isFindRoommate" control={control}>
          <Checkbox
            checked={isFindRoommate}
            onChange={(e) => {
              setIsFindRoommate(e.target.checked);
            }}
          >
            {'Tìm kiếm bạn ở chung'}
          </Checkbox>
        </FormItem>

        {isFindRoommate && (
          <>
            <Row gutter={24}>
              <Col span={12} key="province">
                <FormItem
                  name="province"
                  label="Tỉnh/Thành phố"
                  control={control}
                  required={isFindRoommate}
                >
                  <Select
                    showSearch
                    onSelect={onSelectProvince}
                    filterOption={filterOption}
                    options={province?.map((item: any, i) => {
                      return {
                        ...item,
                        value: item.name,
                        label: item.name,
                      };
                    })}
                  ></Select>
                </FormItem>
              </Col>
              <Col span={12} key="district">
                <FormItem
                  name="district"
                  label="Quận/Huyện"
                  control={control}
                  required={isFindRoommate}
                >
                  <Select
                    showSearch
                    mode="multiple"
                    options={district?.map((item: any, i) => {
                      return {
                        ...item,
                        value: item.name,
                        label: item.name,
                      };
                    })}
                  ></Select>
                </FormItem>
              </Col>
            </Row>
            <FormItem
              name="gender"
              label="Giới tính"
              control={control}
              required={isFindRoommate}
            >
              <Radio.Group
                onChange={(e: RadioChangeEvent) => {
                  setGenderValue(e.target.value);
                  setValue('gender', genderValue);
                }}
                value={genderValue}
              >
                <Radio value={'M'}>Nam</Radio>
                <Radio value={'W'}>Nữ</Radio>
              </Radio.Group>
            </FormItem>

            <Row gutter={24}>
              <Col span={12} key="costFrom">
                <FormItem
                  name="costFrom"
                  label="Giá từ"
                  control={control}
                  required={isFindRoommate}
                >
                  <Input />
                </FormItem>
              </Col>
              <Col span={12} key="costTo">
                <FormItem
                  name="costTo"
                  label="Giá tới"
                  control={control}
                  required={isFindRoommate}
                >
                  <Input />
                </FormItem>
              </Col>
            </Row>
          </>
        )}

        {/* <Row gutter={24}>
                <Col span={8} key="street">
                  <FormItem
                    name="street"
                    label="Đường"
                    control={control}
                  >
                    <Input />
                  </FormItem>
                </Col>
                <Col span={16} key="displayAddress">
                  <FormItem
                    name="displayAddress"
                    label="Địa chỉ hiển thị"
                    control={control}
                  >
                    <Input />
                  </FormItem>
                </Col>
              </Row>

              <FormItem name="cmnd" label="CMND/CCCD" control={control}>
                <Input />
              </FormItem>

              <FormItem name="cmndDate" label="Ngày cấp" control={control}>
                <Input />
              </FormItem>

              <FormItem name="cmndAddress" label="Nơi cấp" control={control}>
                <Input />
              </FormItem> */}
      </Form>
    </>
  );
};

export default EditProfile;
