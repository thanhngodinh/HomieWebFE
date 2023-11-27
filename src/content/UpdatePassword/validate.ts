import * as yup from 'yup';

export const schema = yup.object({
  oldPassword: yup.string().required('Vui lòng nhập mật khẩu cũ'),
  newPassword: yup
    .string()
    .required('Vui lòng nhập mật khẩu mới')
    .test('not-equal', 'Mật khẩu mới phải khác mật khẩu cũ', function (value) {
      const oldPassword = this.resolve(yup.ref('oldPassword'));
      return value !== oldPassword;
    }),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('newPassword')], 'Mật khẩu mới không trùng khớp')
    .required('Vui lòng xác nhận mật khẩu'),
});
