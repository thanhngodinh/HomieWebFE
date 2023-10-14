import { FC, ReactChildren, useCallback, useEffect } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import styles from './SearchResults.module.scss';
import { useSelector } from 'react-redux';
import { selectSearchResults } from '../../redux/search/slice';

const cx = classNames.bind(styles);

interface SearchResultsProps  {
  total?: string | number
  query?: any
  children: React.ReactNode
}

const SearchResults: FC<SearchResultsProps> = ({total ,children}) => {
  // const keys = Object.keys(query)
  // const values = Object.values(query)

  
  return (
      <div>
          <h2 className="suggest-room mt-8 w-4/5 mx-auto">{total || 0} kết quả đã tìm kiếm được</h2>
          
          {children}
      </div>
  );
};


export default SearchResults;
