import User from './user';

export type Login = {
  username: string;
  password: string;
};

export interface LoginRes {
  isResetPass: boolean;
  token: string;
  profile?: User;
}

export type Register = {
  username: string;
  phone: string;
  name: string;
};
