export type Ward = {
  name: string;
  code: number;
  divisionType: string;
  codename: string;
  districtCode: number;
};

export type District = {
  name: string;
  code: number;
  divisionType: string;
  codename: string;
  provinceCode: number;
  wards: Ward[];
};

export type Province = {
  name: string;
  code: number;
  divisionType: string;
  codename: string;
  phone_code: number;
  districts: District[];
};
