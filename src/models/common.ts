export interface PaginationParams {
  _limit: number;
  _page: number;
  _totalRows: number;
}

export interface ListResponse<T> {
  data: T[];
}

export interface ListParams {
  _page?: number;
  _limit?: number;
  _sort?: string;
  _order?: 'asc' | 'desc';

  [key: string]: any;
}

export interface BaseResponse<T> {
  data: T;
  total?: number;
  message?: string;
  status?: string;
}

export type Pagination = {
  pageNumber: number;
  totalPages: number;
  totalCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
};

export type PaginationRequest = {
  keyword: string;
  pageNumber: number;
  pageSize: number;
  order?: 'asc' | 'desc';
  orderBy?: string;
};

export type PaginationBaseReponse<T> = Pagination & {
  data: T;
  message?: boolean;
};

export type PaginationReponse<T> = {
  data: T;
  total?: number;
};
