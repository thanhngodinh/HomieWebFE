export interface BaseResponse<T> {
  data?: T;
  total?: number;
  message?: string;
  status?: string;
}

export type CallBackParam<T> = {
  data: T;
  callback?: any;
};

export type PageFilter = {
  pageSize?: number;
  pageIdx?: number;
  sort?: string;
};
