export interface ListResponse<T> {
  data: T[];
}

export interface BaseResponse<T> {
  data?: T;
  total?: number;
  message?: string;
  status?: string;
}

export type CallBackParam<T> = {
  param: T;
  callback?: any;
};
