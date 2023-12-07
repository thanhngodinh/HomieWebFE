import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import {Pagination as PaginationAntd} from "antd"
import { useSelector } from 'react-redux';
import { selectSearchQuery, updateQuery } from '../../redux/search/slice';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';

interface IProps {
  total?: number
}

type PaginationType = {
	pageIdx: number;
	pageSize: number;
}

export default function Pagination({ total  }: IProps) {
	const router = useRouter()
  const query = useSelector(selectSearchQuery);
	const {pageSize, pageIdx} = router.query


	const handleChange = (page: number, pageSize: number) =>{
		router.replace({
			query: { ...query, pageSize, pageIdx: page },})
	}

  return (
      <PaginationAntd current={Number(pageIdx)|| 1} total={total} pageSize={Number(pageSize)|| 5} onChange={handleChange}></PaginationAntd>
  );
}
