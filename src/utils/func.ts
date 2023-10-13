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

export const queryParamsToObject = (queryParams: any) => {
  const obj = {} as any;
  const paramPairs = queryParams.split('&');

  for (const pair of paramPairs) {
    const [key, value] = pair.split('=');
    obj[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return obj;
}

export const objectWithoutEmptyFields = (object:any) =>{
  const rs = Object.keys(object)
  .filter(key => object[key] !== undefined && object[key] !== "" && object[key] !== null && !Number.isNaN(object[key]))
  .reduce((result:any, key) => {
    result[key] = object[key];
    return result;
  }, {});
  console.log(53,rs)
  return rs
}