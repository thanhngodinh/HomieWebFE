import * as yup from 'yup';

const phoneRegExp =
  /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const schema = yup.object({
  username: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Vui lòng nhập đúng định dạng email'),
  phone: yup.string().matches(phoneRegExp, 'Vui lòng nhập đúng định dạng số điện thoại'),
});
