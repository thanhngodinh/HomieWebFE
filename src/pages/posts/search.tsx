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
  getHostelsWithQuerryParams,
  postHostelsWithQuerryParams,
  selectHostels,
} from '../../redux/hostel/slice';
import {
  selectSearchQuery,
  selectSearchResults,
} from '../../redux/search/slice';
import { useRouter } from 'next/router';
import SearchMultiple from '../../components/SearchMultiple';
import type { SliderMarks } from 'antd/es/slider';
import { formatNumber } from '../../utils/func';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouseUser } from '@fortawesome/free-solid-svg-icons';
import { District, Province, Ward } from '../../models';
import { getUtilitiess, selectUtilitiess } from '../../redux/utilities/slice';

const HostelSearchPage: NextPage & { Layout?: FC } = () => {
  const dispatch = useDispatch<AppDispatch>();

  const {
    loading: UtilitiessLoading,
    listUtilities,
    error: UtilitiessError,
  } = useSelector(selectUtilitiess);
  const { list, total, loading, error } = useSelector(selectSearchResults);

  const [province, setProvince] = useState<
    { value: string; label: string; code: number }[]
  >([]);
  const [district, setDistrict] = useState<
    { value: string; label: string; code: number }[]
  >([]);
  const [ward, setWard] = useState<
    { value: string; label: string; code: number }[]
  >([]);

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

  return (
    <>
      {/* <SearchBar keySearch='name' /> */}
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
                  onSelect: onSelectProvince,
                },
              },
              { name: 'street', label: 'Đường' },
              { name: 'name', label: 'Tên' },
              { name: 'status', label: 'Status' },
              {
                name: 'capacity',
                label: 'Sức chứa',
                typeInput: 'inputNumber',
                type: 'number',
                inputNumberProperties: {
                  min: 0,
                  max: 20,
                  addonBefore: <FontAwesomeIcon icon={faHouseUser} />,
                  style: { width: '80%' },
                },
              },
              {
                name: 'cost',
                label: 'Giá thuê',
                typeInput: 'inputRange',
                type: 'number',
                inputRangeProperties: {
                  min: 0,
                  max: 10000000,
                  marks: marksCost,
                  step: 100000,
                  tooltip: { formatter: formatNumber },
                  style: { width: '80%' },
                },
              },
              {
                name: 'deposit',
                label: 'Tiền cọc',
                typeInput: 'inputRange',
                type: 'number',
                inputRangeProperties: {
                  min: 0,
                  max: 10000000,
                  marks: marksCost,
                  step: 100000,
                  tooltip: { formatter: formatNumber },
                  style: { width: '80%' },
                },
              },
              {
                name: 'utilities',
                label: 'Tiện ích',
                typeInput: 'tagsMultipleSelection',
                tagsData: listUtilities,
              },
            ]}
            actionSearch={postHostelsWithQuerryParams}
          ></SearchMultiple>
        </div>
      </header>
      <SearchResults total={Array.isArray(list) ? list.length : 0}>
        <HostelList hostels={list} />
      </SearchResults>
    </>
  );
};

HostelSearchPage.Layout = HeaderFooterLayout;

export default HostelSearchPage;
