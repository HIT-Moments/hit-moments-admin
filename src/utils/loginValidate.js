import * as Yup from 'yup';

export const loginValidate = () =>
  Yup.object({
    email: Yup.string().email('Email chưa đúng định dạng').required('Vui lòng nhập email'),
    password: Yup.string().required('Vui lòng nhập mật khẩu'),
  });
