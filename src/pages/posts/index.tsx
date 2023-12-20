import { NextPage } from 'next';
import { FC, useEffect, useState } from 'react';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';
import HostelList from '../../components/HostelList';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import {
  elasticSearch,
  elasticSearchForMap,
  getHostelsWithQuerryParams,
  postHostelsWithQuerryParams,
  selectHostels,
} from '../../redux/hostel/slice';
import {
  selectSearchQuery,
  selectSearchResults,
  selectSearchResultsMap,
} from '../../redux/search/slice';
import { useRouter } from 'next/router';
import SearchMultiple from '../../components/SearchMultiple';
import type { SliderMarks } from 'antd/es/slider';
import { formatGoogleAddress, formatNumber } from '../../utils/func';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBookAtlas,
  faHouseUser,
  faMapLocationDot,
} from '@fortawesome/free-solid-svg-icons';
import { District, Province, Ward } from '../../models';
import { getUtilitiess, selectUtilitiess } from '../../redux/utilities/slice';
import MapBox from '../../components/MapBox';
import Head from 'next/head';
import Pagination from '../../components/Pagination/Pagination';
import { UseFormReset, UseFormResetField } from 'react-hook-form';

const HostelSearchPage: NextPage & { Layout?: FC } = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading: UtilitiessLoading,
    listUtilities,
    error: UtilitiessError,
  } = useSelector(selectUtilitiess);
  const { list ,total, loading, error } = useSelector(selectSearchResults);
  const { listAll ,total: totalMap} = useSelector(selectSearchResultsMap);

  console.log(46,list)

  const [province, setProvince] = useState<
    { value: string; label: string; code: number }[]
  >([]);
  const [district, setDistrict] = useState<
    { value: string; label: string; code: number }[]
  >([]);
  const [ward, setWard] = useState<
    { value: string; label: string; code: number }[]
  >([]);

  const [showMap, setShowMap] = useState<boolean>(false);

  const [valueProvince, setValueProvince] = useState("Thành phố Hà Nội")
  const [valueDistrict, setValueDistrict] = useState("")
  const [valueWard, setValueWard] = useState("")


  // const [codeProvince,setCodeProvince] = useState(1)

  const marksCost: SliderMarks = {
    0: '0',
    1000000: '1m',
    2500000: '2,5m',
    10000000: {
      label: <strong>10m</strong>,
    },
  };
  // const query = useSelector(selectSearchQuery);
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
  const getWard = (id: number) => {
    fetch(`https://provinces.open-api.vn/api/d/${id}?depth=2`)
      .then((res) => res.json())
      .then((data: District) => {
        const wardMap =
          data && data.wards
            ? data.wards.map((d) => {
                return { label: d.name, value: d.name, code: d.code };
              })
            : [];
        setWard(wardMap);
      });
  };
  useEffect(() => {
    dispatch(getUtilitiess());
    getProvince();
    getDistrict(1);
  }, []);

  console.log(77, listUtilities);

  const filterProvince = (inputValue: string, option: any) => {
    return option!.value.toUpperCase().indexOf(inputValue.toUpperCase()) !== -1;
  };
  const onSelectProvince = (valueSelect: string) => {
    setValueProvince(valueSelect)
    const provinceSelected = province.find((p) => p.value === valueSelect);
    if (provinceSelected) {
      // setCodeProvince(provinceSelected.code)
      getDistrict(provinceSelected.code);
    }
  };


  const onSelectDistrict = (valueSelect: string) => {
    const districtSelected = district.find((p) => p.value === valueSelect);
    if (districtSelected) {
      // setCodeProvince(provinceSelected.code)
      getWard(districtSelected.code);
    }
  };

  const handleWatch = (data: unknown, value: {name?: string, type?: string}, resetField:  UseFormResetField<any>) =>{
    if(value && value.name === "province"){
      resetField("district")
      resetField("ward")

      
    }
  }

  return (
    <>
      <Head>
        <link
          rel="shortcut icon"
          href="https://firebasestorage.googleapis.com/v0/b/hommie-thanhtc.appspot.com/o/favicon.jpg?alt=media&token=9fd556b4-5171-4805-b044-33b617479fdf"
        ></link>
        <title>Homie | Tìm nhà</title>
      </Head>
      <header className="w-screen h-fit grid grid-cols-9 my-auto py-4 bg-[#f4f4f4] ">
        <div className="col-start-2 col-span-7 flex justify-start items-center">
          <SearchMultiple
            options={[
              {
                name: 'province',
                label: 'Thành phố',
                typeInput: 'autoCompleteInput',
                autoCompleteInputProperties: {
                  options: province,
                  filterOption: filterProvince,
                  onSelect: onSelectProvince,
                },
              },
              {
                name: 'district',
                label: 'Quận/Huyện',
                typeInput: 'autoCompleteInput',
                autoCompleteInputProperties: {
                  options: district,
                  filterOption: filterProvince,
                  onSelect: onSelectDistrict,
                },
              },
              {
                name: 'ward',
                label: 'Phường/Xã',
                typeInput: 'autoCompleteInput',
                autoCompleteInputProperties: {
                  options: ward,
                  filterOption: filterProvince,
                },
              },
              { name: 'street', label: 'Đường' },
              {
                name: 'type',
                label: 'Loại nhà',
                typeInput: 'autoCompleteInput',
                autoCompleteInputProperties: {
                  options: [
                    { value: 'Ký túc xá', label: 'Ký túc xá' },
                    { value: 'Phòng cho thuê', label: 'Phòng cho thuê' },
                    { value: 'Nhà nguyên căn', label: 'Nhà nguyên căn' },
                    { value: 'Phòng ở ghép', label: 'Phòng ở ghép' },
                    { value: 'Căn hộ', label: 'Căn hộ' },
                  ],
                  filterOption: filterProvince,
                  onSelect: onSelectProvince,
                },
              },
              { name: 'name', label: 'Tên' },
              {
                name: 'costFrom',
                label: 'Tiền thuê tối thiểu',
                typeInput: 'inputNumber',
                type: 'number',
                inputNumberProperties: {
                  min: 0,
                  style: { width: '100%' },
                },
              },
              {
                name: 'costTo',
                label: 'Tiền thuê tối đa',
                typeInput: 'inputNumber',
                type: 'number',
                inputNumberProperties: {
                  min: 0,
                  style: { width: '100%' },
                },
              },
              {
                name: 'capacity',
                label: 'Sức chứa',
                typeInput: 'inputNumber',
                type: 'number',
                inputNumberProperties: {
                  min: 0,
                  max: 20,
                  addonBefore: <FontAwesomeIcon icon={faHouseUser} />,
                  style: { width: '100%' },
                },
              },
              {
                name: 'depositFrom',
                label: 'Tiền cọc tối thiểu',
                typeInput: 'inputNumber',
                type: 'number',
                inputNumberProperties: {
                  min: 0,
                  style: { width: '100%' },
                },
              },
              {
                name: 'depositTo',
                label: 'Tiền cọc tối đa',
                typeInput: 'inputNumber',
                type: 'number',
                inputNumberProperties: {
                  min: 0,
                  // max: 10000000,
                  // marks: marksCost,
                  // step: 100000,
                  // tooltip: { formatter: formatNumber },
                  // style: { width: '80%' },
                  style: { width: '100%' },
                },
              },
              {
                name: 'utilities',
                label: 'Tiện ích',
                typeInput: 'tagsMultipleSelection',
                tagsData: listUtilities,
              },
            ]}
            actionSearch={elasticSearch}
            actionSearchMap={elasticSearchForMap}
            handleWatch={handleWatch}
            // footerSearch={
            //   <Button
            //     htmlType="button"
            //     className="buttonIcon buttonIcon__border"
            //     onClick={() => setShowMap(!showMap)}
            //   >
            //     {!showMap ? (
            //       <FontAwesomeIcon icon={faBookAtlas}  size="xs"/>
            //     ) : (
            //       <FontAwesomeIcon icon={faMapLocationDot}  size="xs"/>
            //     )}
            //   </Button>
            // }
          ></SearchMultiple>
        </div>
      </header>
      {/* Bắt đầu Map */}

      {/* <div id="map-box" className={`mt-8 w-4/5 mx-auto h-[400px]`} style={!showMap ? {visibility: 'hidden'}: {visibility: 'visible'}}> */}
      <div id="map-box" className={`mt-8 w-4/5 mx-auto h-[400px]`}>
        <MapBox
          markers={
            listAll && Array.isArray(listAll)
              ? listAll.map((item) => {
                  return {
                    id: item.id,
                    name: item.name,
                    address: formatGoogleAddress({province: item.province,district: item.district,ward: item.ward, street: item.street}),
                    latitude: parseFloat(item.latitude),
                    longitude: parseFloat(item.longitude),
                  };
                })
              : []
          }
        />
      </div>

      {/* Kết thúc Map */}
      <SearchResults total={total}>
        <HostelList hostels={list} />
      </SearchResults>
      <div className={`mt-8 w-4/5 mx-auto text-center`}>
        <Pagination total={total}></Pagination>
      </div>
    </>
  );
};

HostelSearchPage.Layout = HeaderFooterLayout;

export default HostelSearchPage;
