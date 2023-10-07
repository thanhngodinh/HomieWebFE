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
