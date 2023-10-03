
export const getToken = () => {
    return localStorage.getItem("TokenApp")
}

export const setToken = (token: string) => {
  return localStorage.setItem('TokenApp', token);
};