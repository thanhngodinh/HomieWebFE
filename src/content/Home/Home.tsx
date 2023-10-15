import { FC, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './Home.module.scss';
import SearchIcon from '@mui/icons-material/Search';
import HostelList from '../../components/HostelList';
import SuggestItemBasic, {
  SuggestItemBasicProps,
} from '../../components/SuggestItemBasic/SuggestItemBasic';
import { Carousel, Select } from 'antd';
import { Hostel } from '../../models/hostel';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../app/store';
import {
  getHostelSuggest,
  getHostels,
  selectHostels,
} from '../../redux/hostel/slice';
import { getUtilitiess, selectUtilitiess } from '../../redux/utilities/slice';
import SearchSingle from '../../components/SearchBar/SearchSingle';
import { Province } from '../../models';

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

  const filterOption = (input: string, option?: { label: string; value: string }) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase());

  const filterOptionAutoComplete = (inputValue: string, option: any) => {
    return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };

  useEffect(() => {
    dispatch(getHostels());
    dispatch(getHostelSuggest());
    getProvince()
    getDistrict(1)
  }, [dispatch]);

  const onSelectProvince = (valueSelect: string) => {
    const provinceSelected = province.find((p) => p.value === valueSelect);
    if (provinceSelected) {
      // setCodeProvince(provinceSelected.code)
      getDistrict(provinceSelected.code);
    }
  };

  console.log(87,district)

  return (
    <div className="home w-screen">
      <div className="w-full h-3/5 relative">
        <img className="w-full h-full" src={props.bgImg} />
        <div className="absolute top-1/4 w-full text-center flex justify-center">
          <div className="bg-white rounded-full w-3/6	 p-5 light">
            
            {/* <SearchSingle inputProps={{ className: "text-white light " , bordered: false}} keySearch={"name"}  /> */}
            <SearchSingle addonBefore={<Select showSearch size="large" className="w-2/6	 border-b" options={province} onSelect={onSelectProvince} filterOption={filterOption}  bordered={false}/>} 
              bordered={false}         
              inputProps={{className: "w-full text-left", size: "large" ,placeholder: "Tìm..." }}
              searchWithAutoComplete={{options: district, autoCompleteProps: {
                filterOption: filterOptionAutoComplete
              }}}
              navigateTo="/posts"
              keySearch={"district"}
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
                        link={'/'}
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
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Ha Noi',
      link: '/',
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'TP HCM',
      link: '/',
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Da Nang',
      link: '/',
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Can Tho',
      link: '/',
    },
    {
      img: 'https://cdn.vntrip.vn/cam-nang/wp-content/uploads/2017/07/ho-hoan-kiem-3.jpg',
      title: 'Binh Duong',
      link: '/',
    },
  ],
};

export default Home;
