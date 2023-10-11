import { FC, useCallback, useEffect } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import styles from './SearchBar.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectSearchQuery, updateQuery, updateResults } from '../../redux/search/slice';
import { getHostelsWithQuerryParams, selectHostels } from '../../redux/hostel/slice';
import { AppDispatch } from '../../app/store';
import { objectToQueryParams } from '../../utils/func';

const cx = classNames.bind(styles);

interface SearchBarProps  {
  keySearch: string
  navigateTo?: string
}

const SearchBar: FC<SearchBarProps> = ({keySearch,navigateTo}) => {
    // const param = router.pathname
    // const params = param.split("/")
    // const current = params[params.length-1]

    const dispatch = useDispatch<AppDispatch>();
    const query = useSelector(selectSearchQuery);
    // const { list, total, loading, error } = useSelector(selectHostels);
    const hostelsResult = useSelector(selectHostels);
    const router = useRouter();
    console.log(router)

    const onSearch = (value:string, _e: any) => {
      // const newQuery = value;
      // dispatch(updateQuery(value));
      const pathname = router.pathname
      const params = pathname.split("/")
      const current = params[params.length-1]

      if(current !== 'search'){
        router.push(`${navigateTo}?${[keySearch]}=${value}` || `/hostel/search?${[keySearch]}=${value}`)
        
      }else{
        if(value){
          router.replace({
            query: { ...router.query, [keySearch]: value },
          });
        }else{
          router.replace({
            query: {},
          });
        }
      }
      
      
      
    }

    const onChange = (e:any) =>{
      UpdateQuery(e.target.value)
    }
  
    useEffect(() => {
      // Lấy query param từ URL và cập nhật state
      const query = router.query
      const paramQuery = router.query[keySearch] || '';
      UpdateQuery(paramQuery)
      GetHostelsWithQuerryParams(query)
     

    }, [router.query[keySearch], dispatch]);

    useEffect(() => {
      dispatch(updateResults(hostelsResult));
    }, [hostelsResult]);

    const UpdateQuery = useCallback((value:string | string[])=>{
      dispatch(updateQuery(value))
    },[dispatch])

    const GetHostelsWithQuerryParams = useCallback((query:any)=>{
      dispatch(getHostelsWithQuerryParams(query))
    },[dispatch])


    return (
      <header className="w-screen h-fit grid grid-cols-9 my-auto py-4 bg-[#f4f4f4] ">
        <div className="col-start-2 col-span-7 flex justify-start items-center">
          <Input.Search className="w-1/2 h-full" size="large"  placeholder="Tìm ..." value={query} onChange={onChange} allowClear onSearch={onSearch}></Input.Search>
        </div>
      </header>
    );
};

SearchBar.defaultProps = {
  keySearch: 'name',

}

export default SearchBar;
