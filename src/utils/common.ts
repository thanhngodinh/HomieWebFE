export const POST_STATUS = {
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error',
};

export const PostTitleMapping = new Map<string, string>([
  ['success', 'Đã duyệt'],
  ['warning', 'Chờ duyệt'],
  ['error', 'Không duyệt'],
]);

export const genAddress = (
  street: string,
  ward: string,
  district: string,
  province: string
) => {
  return `${street ? street + ', ' : ''}${ward ? ward + ', ' : ''}${
    district ? district + ', ' : ''
  }${province}`;
};
