import * as yup from "yup";

export const schema = yup.object({
    fullName: yup.string().required('Vui lòng nhập họ tên'),
    email: yup.string().required('Vui lòng nhập email').email("Vui lòng nhập đúng định dạng email"),
    province: yup.string().required('Vui lòng chọn tỉnh/thành phố'),
    district: yup.string().required('Vui lòng chọn quận/huyện'),
    // ward: yup.string().required('Vui lòng chọn phường/xã'),
});