import { FC, ReactChildren, useCallback, useEffect } from 'react';
import classNames from 'classnames/bind';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Input } from 'antd';
import styles from './SearchResults.module.scss';

const cx = classNames.bind(styles);

interface SearchResultsProps  {
  total?: string | number
  query?: any
  children: React.ReactNode
}

const SearchResults: FC<SearchResultsProps> = ({query, total ,children}) => {
  console.log(query)
  const keys = Object.keys(query)
  const values = Object.values(query)
  return (
      <div>
          {keys.length >0 &&<h2 className="suggest-room mt-8 w-4/5 mx-auto">{total || 0} kết quả cho 
          “{keys.map((k: string,idx:number)=> (
            <span>{k}: {values[idx]}  </span>
          ))}”</h2>
          }
          {children}
      </div>
  );
};


export default SearchResults;
