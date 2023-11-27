import * as yup from 'yup';

export const schema = yup.object({
  username: yup.string().required('Vui lòng nhập username'),
  password: yup.string().required('Vui lòng nhập mật khẩu cũ'),
});
