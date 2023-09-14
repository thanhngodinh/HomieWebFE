import User from './user';

export type Account = {
  userName: string;
  password: string;
};

export type Token = {
  accessToken: string;
  tokenType: string;
  expiresIn: string;
};
export interface AccountReponse {
  token: Token;
  profile: User;
}
