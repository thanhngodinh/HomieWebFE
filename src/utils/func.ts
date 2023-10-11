export const GetUtility = (utility: string, utilities: any) => {
  for (let u of utilities) {
    if (utility == u?.id) return u;
  }
  return undefined;
};

export const GenAddress = (
  street: string,
  ward: string,
  district: string,
  province: string
) => {
  return `${street ? street + ', ' : ''}${ward ? ward + ', ' : ''}${
    district ? district + ', ' : ''
  }${province}`;
};

export const GenCurrecy = (cost: number) => {
  return cost?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};


export const  objectToQueryParams = (obj: any) => {
  const queryParams = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      queryParams.push(encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]));
    }
  }
  return queryParams.join('&');
}