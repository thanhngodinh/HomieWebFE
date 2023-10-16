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

export const GenCurrecy = (cost: number | undefined) => {
  return cost?.toLocaleString('it-IT', { style: 'currency', currency: 'VND' });
};

export const objectToQueryParams = (obj: any) => {
  if(!obj) return ""
  const queryParams = [];
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      queryParams.push(
        encodeURIComponent(key) + '=' + encodeURIComponent(obj[key])
      );
    }
  }
  return queryParams.join('&');
};

export const queryParamsToObject = (queryParams: any) => {
  const obj = {} as any;
  const paramPairs = queryParams.split('&');

  for (const pair of paramPairs) {
    const [key, value] = pair.split('=');
    obj[decodeURIComponent(key)] = decodeURIComponent(value);
  }

  return obj;
};

export const objectWithoutEmptyFields = (object: any) => {
  const rs = Object.keys(object)
    .filter(
      (key) =>
        object[key] !== undefined &&
        object[key] !== '' &&
        object[key] !== null &&
        !Number.isNaN(object[key])
    )
    .reduce((result: any, key) => {
      result[key] = object[key];
      return result;
    }, {});
  console.log(53, rs);
  return rs;
};

export const convertObjectTypes = (object1: any, object2: any) => {
  const transformedObject = {} as any;
  console.log('object1', object1);
  console.log('object2', object2);
  for (const key in object1) {
    console.log(key);

    if (object1.hasOwnProperty(key)) {
      const targetType = object2[key]?.type;
      const value = object1[key];
      if (targetType === 'number') {
        transformedObject[key] = Number(value);
      } else {
        transformedObject[key] = value;
      }
    }
  }
  return transformedObject;
};

export const isSubset = (obj1: any, obj2: any) => {
  for (const key in obj2) {
    if (obj2.hasOwnProperty(key) && obj2[key] !== obj1[key]) {
      return false;
    }
  }
  return true;
};

export const formatNumber = (number: number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + ' VNĐ';
};
