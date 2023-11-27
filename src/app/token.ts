export const getToken = () => {
  return sessionStorage.getItem('token') || undefined;
};

export const setToken = (token: string) => {
  return sessionStorage?.setItem('token', token);
};
