export type User = {
  id: string;
  userName: string;
  email: string;
  lastName: string;
  middleName?: string;
  firstName: string;
  gender: string;
  userStatus: string;
  phoneName: string;
  isEmailVerified: boolean;
  birthDay: string;

  fullName?: string;

  province?: string
  district?: string
  ward?: string
  street?: string

  displayAddress?: string
  cmnd?:string
  cmndDate?: string | Date
  cmndAddress?: string
};

export default User;
