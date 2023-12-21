import * as yup from 'yup';

export const schema = yup.object({
  type: yup.string().required('Vui lòng chọn Loại nhà'),
  province: yup.string().required('Vui lòng chọn Tỉnh/Thành phố'),
  district: yup.string().required('Vui lòng chọn Quận/Huyện'),
  ward: yup.string().required('Vui lòng chọn Phường/Xã'),
  area: yup
    .number()
    .required('Vui lòng nhập Diện tích')
    .min(0, 'Diện tích không được bé hơn 0')
    .max(1000000, 'Diện tích không hợp lý'),
  capacity: yup
    .number()
    .required('Vui lòng nhập Sức chứa')
    .min(0, 'Sức chứa không được bé hơn 0')
    .max(100, 'Sức chứa không hợp lý'),
  cost: yup
    .number()
    .required('Vui lòng nhập Tiền thuê')
    .min(0, 'Tiền thuê không được bé hơn 0'),
  deposit: yup
    .number()
    .required('Vui lòng nhập Tiền cọc')
    .min(0, 'Tiền cọc không được bé hơn 0'),
  electricityPrice: yup
    .number()
    .required('Vui lòng nhập Tiền điện')
    .min(0, 'Tiền điện không được bé hơn 0'),
  waterPrice: yup
    .number()
    .required('Vui lòng nhập Tiền nước')
    .min(0, 'Tiền nước không được bé hơn 0'),
  parkingPrice: yup
    .number()
    .required('Vui lòng nhập Tiền xe')
    .min(0, 'Tiền xe không được bé hơn 0'),
  servicePrice: yup
    .number()
    .required('Vui lòng nhập Tiền phí khác')
    .min(0, 'Tiền phí khác không được bé hơn 0'),
  name: yup.string().required('Vui lòng nhập Tiêu đề'),
  description: yup.string().required('Vui lòng nhập Mô tả'),
});
