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
