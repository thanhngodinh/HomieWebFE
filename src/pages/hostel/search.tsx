import { NextPage } from 'next';
import { FC } from 'react';
import HeaderFooterLayout from '../../layouts/HeaderFooterLayout';
import SearchBar from '../../components/SearchBar';
import SearchResults from '../../components/SearchResults';
import HostelList from '../../components/HostelList';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../../app/store';
import { useSelector } from 'react-redux';
import { selectHostels } from '../../redux/hostel/slice';
import { selectSearchQuery, selectSearchResults } from '../../redux/search/slice';
import { useRouter } from 'next/router';
import SearchMultiple from '../../components/SearchMultiple';

const HostelSearchPage: NextPage & { Layout?: FC } = () => {
    const { list, total, loading, error } = useSelector(selectSearchResults);
    // const query = useSelector(selectSearchQuery);
    const router = useRouter();
    return (
      <>
        {/* <SearchBar keySearch='name' /> */}
        <header className="w-screen h-fit grid grid-cols-9 my-auto py-4 bg-[#f4f4f4] ">
          <div className="col-start-2 col-span-7 flex justify-start items-center">
            <SearchMultiple options={[
              {name: 'province', label: "Thành phố"},
              {name: 'district', label: "Quận/Huyện"},
              {name: 'ward', label: "Phường/Xã"},
              {name: 'street', label: "Đường"},
              {name: 'name', label: "Tên"},
              {name: 'status', label: "Status"},
              {name: 'cost', label: "Giá thuê", type: "inputRange"},
              {name: 'deposit', label: "Tiền cọc", type: "inputRange"},
              {name: 'capacity', label: "Sức chứa", type: "inputRange"},
              {name: 'utilities', label: "Tiện ích", type: 'tagsMultipleSelection', tagsData: ['Movies', 'Books', 'Music', 'Sports']}
            ]}></SearchMultiple>
          </div>
        </header>
        <SearchResults total={total} query={router.query}>
          <HostelList hostels={list} />
        </SearchResults>
      </>
    )
};

HostelSearchPage.Layout = HeaderFooterLayout;

export default HostelSearchPage;
