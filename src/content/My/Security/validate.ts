import * as yup from "yup";

export const schema = yup.object({
    oldPassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
    newPassword: yup.string().required('Vui lòng nhập mật khẩu mới'),
    confirmPassword: yup.string().required('Vui lòng nhập lại mật khẩu mới'),
});