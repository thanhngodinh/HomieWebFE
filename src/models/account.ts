import User from './user';

export type Account = {
  username: string;
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
