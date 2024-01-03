export const POST_STATUS = {
  Active: 'A',
  Waiting: 'W',
  InActive: 'I',
};

export const PostTitleMapping = new Map<string, string>([
  ['A', 'Đã duyệt'],
  ['W', 'Chờ duyệt'],
  ['V', 'Đã kiểm định'],
  ['H', 'Đã ẩn'],
  ['E', 'Hết hạn'],
  ['I', 'Không duyệt'],
]);
