import { PageFilter } from './common';
import { PostRateInfo } from './rate';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export type Post = {
  id: string;
  name: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  type: string;
  status: 'A' | 'I' | 'W';
  cost: number;
  electricityPrice?: number;
  waterPrice?: number;
  parkingPrice?: number;
  serviecPrice?: number;
  capacity: number;
  area: number;
  description: string;
  latitude: string;
  longitude: string;
  phone?: string;
  isLiked: boolean;
  avgRate: number;
  imageUrl: string[];
  utilities: string[];
  createdAt?: string;
  endedAt?: string;
  createdBy?: string;
  updatedAt?: string;
  updatedBy?: string;
  authorId: string;
  authorName?: string;
  authorAvatar?: string;
  rateInfo: PostRateInfo;
};

export type HostelCreate = {
  name: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  type: string;
  status: string;
  cost: number;
  deposit: number;
  electricityPrice: number;
  waterPrice: number;
  parkingPrice: number;
  servicePrice: number;
  capacity: number;
  area: number;
  phone: number;
  description: string;
  imageUrl: string[];
  utilities: string[];
  longitude?: number | string;
  latitude?: number | string;
};

export type Utilities = {
  id: string;
  name: string;
  icon: IconProp;
};

export interface HostelFilter extends PageFilter {
  name?: string;
  province?: string;
  district?: string;
  ward?: string;
  street?: string;
  status?: string;
  costFrom?: number;
  costTo?: number;
  depositFrom?: number;
  depositTo?: number;
  capacity?: number;
}

export interface Compare {
  post1: string;
  post2: string;
}

export interface CompareRes {
  post1: Post;
  post2: Post;
}
