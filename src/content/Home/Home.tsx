import { FC, useEffect, useMemo, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import HostelList from '../../components/HostelList';
import SuggestItemBasic, {
  SuggestItemBasicProps,
} from '../../components/SuggestItemBasic/SuggestItemBasic';
import { Carousel, Select } from 'antd';
import { Post } from '../../models/hostel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  getHostelSuggest,
  postHostelsWithQuerryParams,
  selectHostels,
} from '../../redux/hostel/slice';
import { getUtilitiess, selectUtilitiess } from '../../redux/utilities/slice';
import SearchSingle from '../../components/SearchBar/SearchSingle';
import { Province } from '../../models';
import { cond } from 'lodash';

const cx = classNames.bind(styles);

interface HomeProps {
  bgImg: string;
  city: SuggestItemBasicProps[];
}

const Home: FC<HomeProps> = (props) => {
  const dispatch = useDispatch<AppDispatch>();
  const { list, listSuggest, loading, error } = useSelector(selectHostels);
  const [province, setProvince] = useState<
    { value: string; label: string; code: number }[]
  >([]);
  const [district, setDistrict] = useState<
    { value: string; label: string; code: number }[]
  >([]);

  const [provincevValue, setProvinceValue] = useState('');

  const getProvince = () => {
    fetch('https://provinces.open-api.vn/api/p')
      .then((res) => res.json())
      .then((data: Province[]) => {
        const provinceMap = data.map((d) => {
          return { label: d.name, value: d.name, code: d.code };
        });
        setProvince(provinceMap);
      });
  };

  const getDistrict = (id: number) => {
    fetch(`https://provinces.open-api.vn/api/p/${id}?depth=2`)
      .then((res) => res.json())
      .then((data: Province) => {
        const districtMap =
          data && data.districts
            ? data.districts.map((d) => {
                return { label: d.name, value: d.name, code: d.code };
              })
            : [];
        setDistrict(districtMap);
        // setValue('district', data?.districts[0]?.name);
        // getWard(data?.districts[0]?.code);
      });
  };

  const filterOption = (
    input: string,
    option?: { label: string; value: string }
  ) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const filterOptionAutoComplete = (inputValue: string, option: any) => {
    return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  useEffect(() => {
    dispatch(postHostelsWithQuerryParams({ pageSize: 5 }));
    dispatch(getHostelSuggest());
    getProvince();
    getDistrict(1);
  }, [dispatch]);

  useEffect(() => {
    setProvinceValue(getProvinceByCode(1)?.value || '');
  }, [province]);

  const onSelectProvince = (valueSelect: string) => {
    const provinceSelected = province.find((p) => p.value === valueSelect);
    if (provinceSelected) {
      // setCodeProvince(provinceSelected.code)
      getDistrict(provinceSelected.code);
    }
  };

  const getValueInputSearch = (value: string) => {
    console.log(91, value);
  };

  const getProvinceByCode = (code: number) => {
    return province.find((p) => p.code === code);
  };

  return (
    <div className="home w-screen">
      <div className="w-full h-3/5 relative">
        <img className="w-full h-full" src={props.bgImg} />
        <div className="absolute top-1/4 w-full text-center flex justify-center">
          <div className="bg-white rounded-full w-3/6	 p-5 light">
            {/* <SearchSingle inputProps={{ className: "text-white light " , bordered: false}} keySearch={"name"}  /> */}
            <SearchSingle
              addonBefore={
                <Select
                  showSearch
                  size="large"
                  className="w-2/6 border-b text-left"
                  value={provincevValue}
                  onChange={(value) => setProvinceValue(value)}
                  options={province}
                  onSelect={onSelectProvince}
                  filterOption={filterOption}
                  bordered={false}
                />
              }
              bordered={false}
              inputProps={{
                className: 'w-full text-left',
                size: 'large',
                placeholder: 'Tìm...',
              }}
              searchWithAutoComplete={{
                options: district,
                autoCompleteProps: {
                  filterOption: filterOptionAutoComplete,
                },
              }}
              navigateTo="/posts"
              keySearch={'district'}
              addMoreValueSearch={{ province: provincevValue }}
            />
          </div>
        </div>
        <div className="absolute left-40 bottom-1/3 grid-flow-row">
          <h1 className="text-6xl text-white">Tìm Home,</h1>
          <h1 className="text-6xl text-white">Tìm Homie</h1>
        </div>
      </div>
      <div className="content-around px-40 p-8">
        <div className="city">
          <h1 className="text-4xl mb-5">Khám phá tại các thành phố</h1>
          <div className="">
            <Carousel autoplay slidesToShow={4}>
              {[
                ...props.city.map((i, index) => {
                  return (
                    <div className="p-2 mb-4">
                      <SuggestItemBasic
                        link={i.link}
                        img={i.img}
                        title={i.title}
                      />
                    </div>
                  );
                }),
              ]}
            </Carousel>
          </div>
        </div>
      </div>

      <HostelList title="Gợi ý của chúng tôi" hostels={listSuggest} />
      <HostelList title="Những nhà mới nhất được đăng" hostels={list} />
    </div>
  );
};

Home.defaultProps = {
  bgImg:
    'https://firebasestorage.googleapis.com/v0/b/nextjs-img.appspot.com/o/image%2Fhero-Fullwidth.png?alt=media&token=87167ea2-8c41-4dd7-87f8-b85a5a1a375c',
  city: [
    {
      img: 'https://res.klook.com/image/upload/fl_lossy.progressive,w_800,c_fill,q_85/destination/lbnwgbgs4eqnzlvozlql.jpg',
      title: 'Thành phố Hà Nội',
      link: '/posts?pageIdx=0&district=&province=Thành+phố+Hà+Nội',
    },
    {
      img: 'https://bcp.cdnchinhphu.vn/zoom/600_315/334894974524682240/2023/3/10/thanh-pho-ho-chi-minh-224682-16784361448451965541176-0-0-382-611-crop-16784361587461533125918.jpg',
      title: 'Thành phố Hồ Chí Minh',
      link: '/posts?pageIdx=0&district=Quận+1&province=Thành+phố+Hồ+Chí+Minh',
    },
    {
      img: 'https://baodautu.vn/Images/chicong/2023/11/02/phe-duyet-quy-hoach-thanh-pho-da-nang-thoi-ky-2021---2030-tam-nhin-den-20501698923654.jpg',
      title: 'Thành phố Đà Nẵng',
      link: '/posts?pageIdx=0&district=&province=Thành+phố+Đà+Nẵng',
    },
    {
      img: 'https://upload.wikimedia.org/wikipedia/commons/c/c4/Can-tho-tuonglamphotos.jpg',
      title: 'Thành phố Cần Thơ',
      link: '/posts?pageIdx=0&district=&province=Thành+phố+Cần+Thơ',
    },
    {
      img: 'https://cdn.vietnambiz.vn/171464876016439296/2021/5/14/img1606-16209784381851840410693.jpg',
      title: 'Tỉnh Bình Dương',
      link: '/posts?pageIdx=0&district=&province=Thành+phố+Bình+Dương',
    },
  ],
};

export default Home;
