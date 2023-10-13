import { FC, useCallback, useEffect, useState ,useLayoutEffect} from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Button, Form, Input, InputNumber, Slider, Space, Tag } from 'antd';
import styles from './SearchMultiple.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectSearchQuery, updateQuery, updateResults } from '../../redux/search/slice';
import { getHostelsWithQuerryParams, selectHostels } from '../../redux/hostel/slice';
import { AppDispatch } from '../../app/store';
import { objectToQueryParams, objectWithoutEmptyFields } from '../../utils/func';
import { FormItem } from 'react-hook-form-antd';
import { Control, Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HostelFilter } from '../../models';

const cx = classNames.bind(styles);

type SearchOptions = {
  name: string;
  label: string;
  type?: 'inputText' | 'inputNumber' | 'inputRange' | 'datetimeRange' | 'tagsMultipleSelection'
  tagsData?: string[]
}

interface SearchMultipleProps  {
  navigateTo?: string
  options?: SearchOptions[]
}

const {CheckableTag} = Tag

const SearchMultiple: FC<SearchMultipleProps> = ({options,navigateTo}) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const query = useSelector(selectSearchQuery);
    // const { list, total, loading, error } = useSelector(selectHostels);
    const hostelsResult = useSelector(selectHostels);

    const [selectedTags, setSelectedTags] = useState<any>({});
    const [isDefaultValue, setIsDefaultValue] = useState(false)

    const router = useRouter();
    const {
      control,
      register,
      getValues,
      setValue,
      handleSubmit,
      formState: { errors },
    } = useForm({
      defaultValues: {
        ...query
      }
    });

    useEffect(() => {
      
      const defaultValue = router.query
      const keys = Object.keys(defaultValue)
      if (keys.length != 0 && !isDefaultValue) {
        for(const q of keys){
          setValue(q, defaultValue[q]);
          console.log(62,q)
        }
        const inputsTag = getInputsTypeTagsMultiple(options)
        for(const input of inputsTag){
          setSelectedTags({[input.name]:defaultValue[input.name]})
        }
        console.log(64,defaultValue)
        setIsDefaultValue(true)
      }
    
    }, [Object.keys(router.query).toString(),setValue]);
    const getInputsTypeTagsMultiple = (options?: SearchOptions[])  => {
      if(!options || options.length == 0) return []
      return options.filter((option) => option.type === 'tagsMultipleSelection')
    }
    console.log(getValues())
    const onSearch = (data:HostelFilter) =>{
      console.log("searchData", data)
      const inputsTag = getInputsTypeTagsMultiple(options)
      for(const input of inputsTag){
        (data as any)[input.name] = selectedTags[input.name]
      }

      const pathname = router.pathname
      const params = pathname.split("/")
      const current = params[params.length-1]
      const newData = objectWithoutEmptyFields(data)
      //Trường hợp đặc biệt: nối object với selectedTags
      
      console.log('newDate', newData)

      if(current !== 'search'){
        router.push(`${navigateTo}?${objectToQueryParams(newData)}` || `/hostel/search?${objectToQueryParams(newData)}`)
        
      }else{
        if(Object.keys(newData).length>0){
          router.replace({
            query: { ...newData },
          });
        }else{
          router.replace({
            query: {},
          });
        }
      }
    }

    // useLayoutEffect(() => {
    //   dispatch(updateResults(hostelsResult));
    // }, [hostelsResult]);
  
    useEffect(() => {
      // Lấy query param từ URL và cập nhật state
      const query = router.query
      const paramQuery = router.query || '';
      console.log(99,paramQuery)
      UpdateQuery(paramQuery)
      GetHostelsWithQuerryParams(query)
     

    }, [Object.keys(router.query).toString(), dispatch]);

    useEffect(() => {
      dispatch(updateResults(hostelsResult));
    }, [hostelsResult]);

    const UpdateQuery = useCallback((value: any)=>{
      dispatch(updateQuery(value))
    },[dispatch])

    const GetHostelsWithQuerryParams = useCallback((query:any)=>{
      dispatch(getHostelsWithQuerryParams(query))
    },[dispatch])


    const handleTagsChange = (tag: string, checked: boolean, name: string) => {
      if(!selectedTags[name]){
        selectedTags[name] =[]
      }
      console.log(111,selectedTags)
      const nextSelectedTags = checked
        ? [...selectedTags[name], tag]
        : selectedTags[name]?.filter((t: string) => t !== tag);
      console.log('You are interested in: ', nextSelectedTags);
      setSelectedTags({[name]:nextSelectedTags});
    };


    return (
      <Form 
        layout="vertical"  
        className="w-screen h-fit"
        onFinish={handleSubmit(onSearch)}
      >
          <Space className='col-span-3 grid grid-cols-3 '>
            {options && options.length > 0 && options.map(({name,label,type,tagsData}:SearchOptions, idx: number ) => (
              <FormItem name={name} label={label} control={control}>
                {type === 'inputNumber'  ? 
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => <InputNumber min={0} defaultValue={0} {...field} />} /> :
                type === 'inputRange' ? <Slider range />:
                type === 'datetimeRange'? <Input></Input> :
                type === 'tagsMultipleSelection'? 
                <Space size={[0,8]} wrap>
                  {tagsData && tagsData.map((tag) => (
                    <Controller
                    name={name}
                    control={control}
                    render={({ field }) => <CheckableTag {...field}  key={tag}  checked={selectedTags[name]?.includes(tag)} onChange={(checked) => handleTagsChange(tag, checked, name)}>{tag}</CheckableTag>}
                    />
                  ))}
                </Space>
                :<Controller
                name={name}
                control={control}
                render={({ field }) => <Input {...field} />}
              />
                }
              </FormItem>
              )) 
            }
          </Space>
        
          <Space align="start">
            <Button htmlType="reset" className="button button__border" >
              More
            </Button>
            {/* <Button htmlType="reset" className="button button__border" >
              Hủy
            </Button> */}
            <Button htmlType="submit" className="button button__fill ml-8">
              Tìm kiếm
            </Button>
          </Space>
          
      </Form>
    );
};

SearchMultiple.defaultProps = {
  options: [],

}

export default SearchMultiple;
