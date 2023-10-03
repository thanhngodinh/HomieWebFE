export type Hostel = {
  id: string;
  name: string | undefined;
  province: string | undefined;
  district: string | undefined;
  ward: string | undefined;
  street: string | undefined;
  postType: string | undefined;
  status: string | undefined;
  cost: number | undefined;
  electricityPrice: number | undefined;
  waterPrice: number | undefined;
  parkingPrice: number | undefined;
  wifiPrice: number | undefined;
  capacity: number | undefined;
  area: number | undefined;
  description: string | undefined;
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
  postType: string;
  status: string;
  cost: number;
  electricityPrice: number;
  waterPrice: number;
  parkingPrice: number;
  wifiPrice: number;
  capacity: number;
  area: number;
  phone: number;
  description: string;
  images: string[];
  utilities: string[];
};

