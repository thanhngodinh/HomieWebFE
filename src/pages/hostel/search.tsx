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

const HostelSearchPage: NextPage & { Layout?: FC } = () => {
    const { list, total, loading, error } = useSelector(selectSearchResults);
    // const query = useSelector(selectSearchQuery);
    const router = useRouter();
    return (
      <>
        <SearchBar keySearch='name' />
        <SearchResults total={total} query={router.query}>
          <HostelList hostels={list} />
        </SearchResults>
      </>
    )
};

HostelSearchPage.Layout = HeaderFooterLayout;

export default HostelSearchPage;
