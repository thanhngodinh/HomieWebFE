import * as yup from "yup";

export const schema = yup.object({
    oldPassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
    newPassword: yup.string().required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: yup.string().oneOf([yup.ref('newPassword')], 'Passwords do not match').required('Password confirmation is required'),
});