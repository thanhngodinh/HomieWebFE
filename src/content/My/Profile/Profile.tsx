import React,{ FC, useState , useEffect, useMemo } from 'react';
import classNames from 'classnames/bind';
import styles from './Profile.module.scss';
import PostItem from '../../../components/PostItem';
import SubHeader from '../../../components/SubHeader';
import { Avatar, Button, Col, Divider, Form, Input, Row, Select } from 'antd';
import { District, HostelCreate, Province, User, Ward } from '../../../models';
import { useForm } from 'react-hook-form';
import { FormItem } from "react-hook-form-antd";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from './validate';



const cx = classNames.bind(styles);

interface ProfileProps {}

const Profile: FC<ProfileProps> = () => {
  const [form] = Form.useForm();
  const [province, setProvince] = useState<Province[]>([]);
  const [district, setDistrict] = useState<District[]>([]);
  const [ward, setWard] = useState<Ward[]>([]);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<User>({
    defaultValues: {
      fullName: "",
      email: "",
      province: "",
      district: "",
      ward: "",
      street: "",
      displayAddress: "",
      cmnd: "",
      cmndAddress: "",
      cmndDate: ""

    },
    resolver: yupResolver(schema)
  });

  const getProvince = () => {
    fetch('https://provinces.open-api.vn/api/p')
      .then((res) => res.json())
      .then((data: Province[]) => {
        setProvince(data);
        // setValue('province', data[0].name);
        setValue('province', "");

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
    getProvince();
    getDistrict(1);
  }, []);


  const handleFormValueChange = (valueChange: any) =>{
    const formFieldName = Object.keys(valueChange)[0];
    console.log(JSON.parse(valueChange[formFieldName]))
    console.log(formFieldName)
    if (formFieldName === "province") {
      getDistrict(JSON.parse(valueChange[formFieldName])?.code)
      form.setFieldsValue({district: undefined})
    }
    else if (formFieldName === "district") {
      getWard(JSON.parse(valueChange[formFieldName])?.code)
      form.setFieldsValue({ward: undefined})
    }
  }


  return (
    <>
      <SubHeader
        title="Quản lý tài khoản"
        items={[
          { id: 'profile', name: 'Hồ Sơ' },
          { id: 'security', name: 'Bảo mật' },
          { id: 'post', name: 'Quản lý tin đăng' },
        ]}
      ></SubHeader>
      <div className="container mx-auto my-12">
        <div className="grid grid-cols-3">
          <div className="col-span-1 text-center border-r-4">
            <h2 className="mb-8">Hồ sơ</h2>
            <div className="grid grid-flow-row auto-rows-max items-center gap-8">
              <div className="">
                <Avatar
                  // size={{ xs: 24, sm: 32, md: 40, lg: 64, xl: 80, xxl: 100 }}
                  size={{ xs: 32, sm: 40, md: 64, lg: 80, xl: 100, xxl: 124 }}

                >
                  K
                </Avatar>
              </div>

              <h2>BlueJ</h2>
              <div className="grid grid-cols-2 divide-x items-center">
              
                <h3>
                  2<div className="text__normal">Đã theo dõi</div>
                </h3>
                <h3>
                  12<div className="text__normal">Người theo dõi</div>
                </h3>
              </div>

              <div className="">
                <button type="button" className=" button button__fill button__fill-large text__normal">
                  Thay đổi ảnh đại diện
                </button>
                
              </div>

              <div className="">
                <button type="button" className=" button button__border button__border-large text__normal">
                  Xem người theo dõi
                </button>    
              </div>
            </div>
          </div>
          <div className="col-span-2 pl-48">
            <h4 className="">Thông tin cá nhân</h4>

            {/* <div className="flex justify-end gap-4">
              <Button htmlType="reset" className="button button__border" >
                Hủy
              </Button>
              <Button htmlType="submit" className="button button__fill">
                Lưu
              </Button>
            </div> */}

            <Form
              form={form}
              name="validateOnly"
              layout="vertical"
              autoComplete="off"
              onFinish={handleSubmit((data)=>{
                console.log(data);
              })}
              onValuesChange={handleFormValueChange}
            >
              <div className="flex justify-end gap-4">
                <Button htmlType="reset" className="button button__border" >
                  Hủy
                </Button>
                <Button htmlType="submit" className="button button__fill">
                  Lưu
                </Button>
              </div>
              <FormItem
                name="fullName"
                label="Họ tên"
                control={control}
                required
              >
                <Input />
              </FormItem>
              <FormItem name="email" label="Email" control={control} required>
                <Input />
              </FormItem>

              <Row gutter={24}>
                <Col span={8} key="province">
                  <FormItem
                    name="province"
                    label="Tỉnh/Thành phố"
                    control={control}
                    required
                  >
                    
                    <Select size="large" 
                        onChange={(value: string) => {
                          setValue('province', JSON.parse(value).name);
                        }}
                        options={ province?.map((item: any, i) => {return {...item,value: JSON.stringify(item), label:item.name }})}>
                    </Select>
                  </FormItem>
                </Col>
                <Col span={8} key="district">
                  <FormItem
                    name="district"
                    label="Quận/Huyện"
                    control={control}
                    required
                  >
                    
                    <Select size="large"
                      onChange={(value: string) => {
                        // getWard(JSON.parse(value)?.code);
                        setValue('district', JSON.parse(value)?.name);
                      }}
                      options={district?.map((item: any, i) => {return {...item,value: JSON.stringify(item), label:item.name }})}
                    >
                    </Select>
                  </FormItem>
                </Col>
                <Col span={8} key="ward">
                  <FormItem label="Phường/Xã" name="ward" control={control}>
                    <Select size="large"
                      onChange={(value: string) => {
                        setValue('ward', JSON.parse(value)?.name);
                      }}
                      
                      options={ward?.map((item: any, i) => {return {...item,value: JSON.stringify(item), label:item.name }})}
                    >
                    </Select>
                  </FormItem>
                </Col>
              </Row>

              <Row gutter={24}>
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
              </FormItem>
            </Form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
