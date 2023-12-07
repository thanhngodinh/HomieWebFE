import { FC, useCallback, useEffect,useState } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AutoComplete, Button, Input, Space } from 'antd';
import styles from './SearchSingle.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectSearchQuery, updateQuery, updateResults } from '../../redux/search/slice';
import { elasticSearch, postHostelsWithQuerryParams, selectHostels } from '../../redux/hostel/slice';
import { AppDispatch } from '../../app/store';
import { objectToQueryParams } from '../../utils/func';
import { SearchOutlined } from '@ant-design/icons';

const cx = classNames.bind(styles);

type SearchWithAutoComplete = {
  options: any[]
  autoCompleteProps?: any
}

interface SearchSingleProps  {
  keySearch: string
  navigateTo?: string
  inputProps?: any
  bordered?: boolean
  addonBefore?: React.ReactNode
  addMoreValueSearch?: { [key: string]: any }
  searchWithAutoComplete?: SearchWithAutoComplete
}

const SearchSingle: FC<SearchSingleProps> = ({keySearch,navigateTo,inputProps,bordered,addonBefore,searchWithAutoComplete, addMoreValueSearch}) => {
    // const param = router.pathname
    // const params = param.split("/")
    // const current = params[params.length-1]

    const dispatch = useDispatch<AppDispatch>();
    const [inputValue,setInputValue] = useState("")
    // const query = useSelector(selectSearchQuery);

    // const { list, total, loading, error } = useSelector(selectHostels);
    const hostelsResult = useSelector(selectHostels);
    const router = useRouter();
    // console.log(router)

    const onSearch = (value:string, _e: any) => {
      // const newQuery = value;
      // dispatch(updateQuery(value));
      const pathname = router.pathname
      const params = pathname.split("/")
      const current = params[params.length-1]
      console.log(51,value)

      if(current !== 'search'){
        if(addMoreValueSearch){
          router.push(`${navigateTo}?${[keySearch]}=${value}&${objectToQueryParams(addMoreValueSearch)}` || `/posts?${[keySearch]}=${value}&${objectToQueryParams(addMoreValueSearch)}`)
        }else{
          router.push(`${navigateTo}?${[keySearch]}=${value}` || `/posts?${[keySearch]}=${value}`)
        }
        
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

    // const sendDataToParent = (data: any) => {
    //   if(getValueInput){
    //     getValueInput(data);
    //   }
    // }

    const onChange = (e:any) =>{
      const data = e.target?.value || e
        setInputValue(data);
        // sendDataToParent(data)
    }
  
    useEffect(() => {
      // Lấy query param từ URL và cập nhật state
      const paramQuery = router.query[keySearch] || '';
      console.log(66,paramQuery)
      

      UpdateQuery(paramQuery)
      PostHostelsWithQuerryParams(paramQuery)
    
    }, [router.query[keySearch], dispatch]);

    useEffect(() => {
      dispatch(updateResults(hostelsResult));
    }, [hostelsResult]);

    const UpdateQuery = useCallback((value:string | string[])=>{
      dispatch(updateQuery(value))
    },[dispatch])

    const PostHostelsWithQuerryParams = useCallback((query:any)=>{
      // dispatch(postHostelsWithQuerryParams(query));
      dispatch(elasticSearch(query));
    },[dispatch])


    return (
      // <header className="w-screen h-fit grid grid-cols-9 my-auto py-4 bg-[#f4f4f4] ">
      //   <div className="col-start-2 col-span-7 flex justify-start items-center">
      <div style={{ width: '100%'}}  >
        {!bordered && addonBefore ?  addonBefore : <></>}
        <Space.Compact style={{width: !bordered ?'60%': '100%'}}>
          {bordered && addonBefore}
          {!searchWithAutoComplete ? <Input 
              {...inputProps}
              value={inputValue} 
              onChange={onChange} 
              onPressEnter={onSearch} 
              bordered={bordered}
            >

          </Input>
          : <AutoComplete size="large"
              bordered={bordered}
              value={inputValue} 
              onChange={onChange} 
              onPressEnter={onSearch}
              options={searchWithAutoComplete.options}
              {...inputProps}
              {...searchWithAutoComplete.autoCompleteProps}
          ></AutoComplete>}
          {bordered && <Button type='default'  size="large" onClick={(e)=>onSearch(inputValue,e)} icon={<SearchOutlined rev={undefined} />} />}

        </Space.Compact>
        {!bordered && <Button type='text' shape="circle" size="large" onClick={(e)=>onSearch(inputValue,e)} icon={<SearchOutlined rev={undefined} />} />}
      </div>
      //   </div>
      // </header>
    );
};

SearchSingle.defaultProps = {
  keySearch: 'name',

}

export default SearchSingle;
