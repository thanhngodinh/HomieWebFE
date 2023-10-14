import { FC, useCallback, useEffect, useState ,useLayoutEffect} from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { AutoComplete, Button, Form, Input, InputNumber, Slider, Space, Tag } from 'antd';
import styles from './SearchMultiple.module.scss';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { selectSearchQuery, updateQuery, updateResults } from '../../redux/search/slice';
import { postHostelsWithQuerryParams, selectHostels } from '../../redux/hostel/slice';
import { AppDispatch } from '../../app/store';
import { convertObjectTypes, isSubset, objectToQueryParams, objectWithoutEmptyFields } from '../../utils/func';
import { FormItem } from 'react-hook-form-antd';
import { Control, Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { HostelFilter } from '../../models';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCompress, faCompressArrowsAlt } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

type SearchOptions = {
  name: string;
  label: string;
  typeInput?: 'inputText' | 'inputNumber' | 'inputRange' | 'datetimeRange' | 'tagsMultipleSelection' | 'autoCompleteInput'
  tagsData?: {id: string, name: string, icon?: string}[]
  type?: 'string' | 'number' | 'date-time'
  inputRangeProperties?: { [key: string]: any}
  inputNumberProperties?: { [key: string]: any}
  autoCompleteInputProperties?: { [key: string]: any}

}

interface SearchMultipleProps  {
  navigateTo?: string
  options?: SearchOptions[]
  actionSearch?: any
}

const {CheckableTag} = Tag

const SearchMultiple: FC<SearchMultipleProps> = ({options,navigateTo,actionSearch}) => {

    const [form] = Form.useForm();
    const dispatch = useDispatch<AppDispatch>();
    const query = useSelector(selectSearchQuery);
    // const { list, total, loading, error } = useSelector(selectHostels);
    const hostelsResult = useSelector(selectHostels);

    const [selectedTags, setSelectedTags] = useState<any>({});
    const [isDefaultValue, setIsDefaultValue] = useState(false)
    const [showMore, setShowMore] = useState(false)

    const optionsToShow = showMore ? options : options?.slice(0, 3);

    const defaultSearchType  = {
      // pageSize: {type: 'number'},
      pageIdx: {type: 'number'},
    }



    const defaultSearchValue = {
        // pageSize: 1, 
        pageIdx: 0
    }

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
          if(q.slice(-2) === 'To'){
            const newQ = q.slice(0,-2)
            setValue(newQ, [defaultValue[q], defaultValue[`${newQ}From`]])
          }else{
            setValue(q, defaultValue[q]);
          }
        }
        const inputsTag = getInputsTypeTagsMultiple(options)
        for(const input of inputsTag){
          setSelectedTags({[input.name]:defaultValue[input.name]})
        }
        setIsDefaultValue(true)
      }
    
    }, [Object.keys(router.query).toString(),setValue]);
    
    const getInputsTypeTagsMultiple = (options?: SearchOptions[])  => {
      if(!options || options.length == 0) return []
      return options.filter((option) => option.typeInput === 'tagsMultipleSelection')
    }

    const getInputsTypeTagsInputRange = (options?: SearchOptions[])  => {
      if(!options || options.length == 0) return []
      return options.filter((option) => option.typeInput === 'inputRange')
    }

    const onSearch = (data:HostelFilter) =>{
      console.log("searchData", data)
      // *gán các biến ngoại lệ

      const inputsTagMultiple = getInputsTypeTagsMultiple(options)
      for(const input of inputsTagMultiple){
        (data as any)[input.name] = selectedTags[input.name]
      }

      const inputsTagInputRange = getInputsTypeTagsInputRange(options)
      for(const inputRange of inputsTagInputRange){
        const fieldValueFrom = `${inputRange.name}From`;
        const fieldValueTo = `${inputRange.name}To`;
        const valueInputRange = (data as any)[inputRange.name];
        if(valueInputRange){
          (data as any)[fieldValueFrom] = valueInputRange[0];
          (data as any)[fieldValueTo] =  valueInputRange[1];
          delete (data as any)[inputRange.name]
        }
         
      }
      //*
      console.log(124,data)
      const pathname = router.pathname
      const params = pathname.split("/")
      const current = params[params.length-1]
      const newData = objectWithoutEmptyFields(data)

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

  
    useEffect(() => {
      // Lấy query param từ URL và cập nhật state

      console.log("Enter here..." , router.query);
      const paramQuery = router.query as any
      UpdateQuery(paramQuery)
      if((Object.keys(defaultSearchValue).length != 0 && Object.keys(paramQuery).length != 0) || Object.keys(defaultSearchValue).length == 0) {
        ActionSearch(paramQuery)
      }

    }, [router.query]);

    useEffect(() => {
      if(!isSubset(router.query,defaultSearchValue)){
        router.replace({
          query: { ...defaultSearchValue, ...router.query},
        });
    
      }
      
    }, []);

    useEffect(() => {
      dispatch(updateResults(hostelsResult));
    }, [hostelsResult]);

    const UpdateQuery = useCallback((value: any)=>{
      dispatch(updateQuery(value))
    },[dispatch])

    const ActionSearch = useCallback((query:any)=>{
      const newQuery = convertObjectTypes(query,mergeObject(getObjectTypeOptions(options),defaultSearchType))
      dispatch(actionSearch(newQuery));
    },[dispatch])


    const handleTagsChange = (tag: string, checked: boolean, name: string) => {
      if(!selectedTags[name]){
        selectedTags[name] =[]
      }
      const nextSelectedTags = checked
        ? [...selectedTags[name], tag]
        : selectedTags[name]?.filter((t: string) => t !== tag);
      setSelectedTags({[name]:nextSelectedTags});
    };

    const getObjectTypeOptions = (options?: SearchOptions[]) =>{
      if(!options || options.length == 0) return 
      const rs = {} as any
      for(const option of options){
        const optionName = option.name
       
        if(option.typeInput === 'inputRange'){//ngoại lệ
          const optionNameFrom = `${optionName}From`;
          const optionNameTo = `${optionName}To`;
          rs[optionNameFrom] = {type: option.type || 'string'}
          rs[optionNameTo] = {type: option.type || 'string'}
        }else{
          rs[optionName] = {type: option.type || 'string'}
        }
        
        
      }
      
      return rs
    }

    const mergeObject = (object1: any, object2: any) =>{
      return {...object1, ...object2}
    }

    return (
      <Form 
        layout="vertical"  
        className="w-screen h-fit"
        onFinish={handleSubmit(onSearch)}
      >
          <div className='grid grid-cols-3 gap-4'>
            {optionsToShow && optionsToShow.length > 0 && optionsToShow.map(({name,label,typeInput,tagsData,inputRangeProperties, inputNumberProperties,autoCompleteInputProperties}:SearchOptions, idx: number ) => (
              <FormItem className={typeInput==="tagsMultipleSelection" ? 'col-span-3': ''} name={name} label={label} control={control}>
                {typeInput === 'inputNumber'  ? 
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => <InputNumber {...field} {...inputNumberProperties} />} /> :
                typeInput === 'inputRange' ?
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) => <Slider {...field} range {...inputRangeProperties}/>} />:
                typeInput === 'datetimeRange'? <Input></Input> :
                typeInput === 'tagsMultipleSelection'? 
                <Space size={[0,8]} wrap>
                  {tagsData && tagsData.map((tag) => (
                    <Controller
                    name={name}
                    control={control}
                    render={({ field }) => <CheckableTag {...field}  key={tag.id}  checked={selectedTags[name]?.includes(tag.id)} onChange={(checked) => handleTagsChange(tag.id, checked, name)}>{tag.name}</CheckableTag>}
                    />
                  ))}
                </Space>
                :typeInput === 'autoCompleteInput'?
                <Controller
                  name={name}
                  control={control}
                  render={({ field }) =>  
                    <AutoComplete
                      {...autoCompleteInputProperties}
                      {...field}
                    >
                    </AutoComplete>}
                /> :
                <Controller
                name={name}
                control={control}
                render={({ field }) => <Input {...field} />}
              />
                }
              </FormItem>
              )) 
            }
          </div>
        
          <Space align="start">
              <Button htmlType="button" className="buttonIcon buttonIcon__border" onClick={()=>setShowMore(!showMore)}>
                {
                  !showMore ?  <FontAwesomeIcon icon={faCompress} size="xs"/>
                  :<FontAwesomeIcon icon={faCompressArrowsAlt} size="xs"/>
                }
            </Button>
            <Button htmlType="submit" className="button button__fill">
              Tìm kiếm
            </Button>
          </Space>
          {/* <ArrowUpOutlined /> */}
      </Form>
    );
};

SearchMultiple.defaultProps = {
  options: [],

}

export default SearchMultiple;
