import * as yup from 'yup';

export const schema = yup.object({
  name: yup.string().required('Vui lòng nhập họ tên'),
  email: yup
    .string()
    .required('Vui lòng nhập email')
    .email('Vui lòng nhập đúng định dạng email'),
  province: yup.string().required('Vui lòng chọn tỉnh/thành phố'),
  district: yup.array().required('Vui lòng chọn quận/huyện'),
  // ward: yup.string().required('Vui lòng chọn phường/xã'),
  costFrom: yup
    .number()
    .required('Vui lòng nhập Giá từ')
    .min(0, 'Giá từ không được bé hơn 0'),
  costTo: yup
    .number()
    .required('Vui lòng nhập Giá tới')
    .min(0, 'Giá tới không được bé hơn 0'),
});
