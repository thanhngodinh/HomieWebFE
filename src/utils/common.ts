export const POST_STATUS = {
  Active: 'A',
  Waiting: 'W',
  InActive: 'I',
};

export const PostTitleMapping = new Map<string, string>([
  ['A', 'Đã duyệt'],
  ['W', 'Chờ duyệt'],
  ['I', 'Không duyệt'],
]);
