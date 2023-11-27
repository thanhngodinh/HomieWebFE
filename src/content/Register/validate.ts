import * as yup from 'yup';

export const schema = yup.object({
  username: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Vui lòng nhập đúng định dạng email'),
});
