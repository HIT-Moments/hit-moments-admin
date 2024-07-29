import { login } from '@/apis/auth.api';
import { Formik, Field, Form } from 'formik';
import { setToken } from '@/utils/authToken';
import { Button } from '@/components/ui/button';
import { loginValidate } from '@/utils/loginValidate';
import LoginImage from '../../assets/images/login-img.png';
import { useToast } from '@/components/ui/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { toast } = useToast();
  const navigate = useNavigate();

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-10">
      <div>
        <img src={LoginImage} className="w-[400px]" alt="" />
      </div>
      <div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginValidate}
          onSubmit={({ email, password }) => {
            login({ email, password })
              .then((res) => {
                setToken(res.data?.data?.accessToken);
                toast({
                  className: 'bg-success text-primaryLight-10',
                  title: 'Đăng nhập thành công',
                  description: 'Chuyển hướng đến trang chủ...',
                });
                setTimeout(() => {
                  navigate('/');
                }, 2000);
              })
              .catch((error) => {
                toast({
                  className: 'bg-error text-primaryLight-10',
                  variant: 'destructive',
                  title: 'Đăng nhập thất bại',
                  description: error.response?.data?.message || 'Đã có lỗi xảy ra',
                });
              });
          }}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col items-center gap-4">
              <h1 className="text-center text-8xl">Đăng nhập</h1>
              <div>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className={`border-b-black w-72 border-b py-2 pl-4 text-2xl placeholder:text-2xl focus:border-b-primaryLight-100 focus:outline-none ${
                    errors.email && touched.email && '!border-b-error outline-error'
                  }`}
                />
                <div className="text-2xl text-error">&#8205;{touched.email ? errors.email : ''}</div>
              </div>
              <div>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  className={`border-b-black w-72 border-b py-2 pl-4 text-2xl placeholder:text-2xl focus:border-b-primaryLight-100 focus:outline-none ${
                    errors.password && touched.password && '!border-b-error outline-error'
                  }`}
                />
                <div className="text-2xl text-error">&#8205;{touched.password ? errors.password : ''}</div>
              </div>
              <Button
                type="submit"
                className="mt-4 h-12 w-52 rounded-full bg-primaryLight-100 text-3xl text-neuturalLight-10"
              >
                Đăng nhập
              </Button>
            </Form>
          )}
        </Formik>
      </div>
      <Toaster />
    </div>
  );
};

export default Login;
