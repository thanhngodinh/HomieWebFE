import { extend } from 'lodash';
import { PageFilter } from './common';

export type PostRateInfo = {
  id: number;
  postId: string;
  star1: number;
  star2: number;
  star3: number;
  star4: number;
  star5: number;
  total: number;
  avgRate: number;
  rateList: Rate[];
};

export type Rate = {
  postId?: string;
  star: number;
  comment: string;
  createdAt?: Date;
  updatedAt?: Date;
  authorName?: string;
  authorAvatar?: string;
};
