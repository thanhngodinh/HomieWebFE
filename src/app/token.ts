export const getToken = () => {
  return localStorage.getItem('token') || undefined;
};

export const setToken = (token: string) => {
  return localStorage?.setItem('token', token);
};
