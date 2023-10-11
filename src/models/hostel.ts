import { extend } from "lodash";
import { PageFilter } from "./common";

export type Hostel = {
  id: string;
  name: string;
  province: string;
  district: string;
  ward: string;
  street: string;
  postType: string | undefined;
  status: string | undefined;
  cost: number;
  electricityPrice: number | undefined;
  waterPrice: number | undefined;
  parkingPrice: number | undefined;
  serviecPrice: number | undefined;
  capacity: number | undefined;
  area: number | undefined;
  description: string | undefined;
  phone: string | undefined;
  imageUrl: string[];
  utilities: string[];
  createdAt: string | undefined;
  createdBy: string | undefined;
  updatedAt: string | undefined;
  updatedBy: string | undefined;
};

export type HostelCreate = {
  name: string;
  province: string;
  district: string;
  ward: string;
  street: string;
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
};

export type Utilities = {
  id: string;
  name: string;
  icon: string;
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