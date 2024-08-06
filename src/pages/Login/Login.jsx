import { toast } from 'sonner';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/button';

import useLogin from '@/hooks/useLogin';
import Loading from '@/components/Loading/Loading';
import { loginValidate } from '@/utils/loginValidate';
import LoginImage from '@/assets/images/login-img.png';
import emailInputImage from '@/assets/images/user.png';
import passwordInputImage from '@/assets/images/password.png';

const Login = () => {
  const navigate = useNavigate();
  const { isLoading, handleLogin } = useLogin();

  const handleSubmit = async ({ email, password }) => {
    const error = await handleLogin({ email, password });

    const errorMessage = error?.response?.data?.message || error?.message || 'Đã có lỗi xảy ra';

    if (error) {
      toast.error(errorMessage);
      return;
    }

    toast.success('Đăng nhập thành công', {
      description: 'Chuyển hướng đến trang chủ...',
    });

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (isLoading) {
    <Loading />;
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-12">
      <div>
        <img src={LoginImage} className="w-[500px]" alt="" />
      </div>
      <div>
        <Formik
          initialValues={{
            email: '',
            password: '',
          }}
          validationSchema={loginValidate}
          onSubmit={({ email, password }) => handleSubmit({ email, password })}
        >
          {({ errors, touched }) => (
            <Form className="flex flex-col items-center">
              <h1 className="mb-2 text-center text-6xl">Đăng nhập</h1>
              <p className="mb-8 text-center text-base text-neuturalLight-80">
                Vui lòng nhập email và mật khẩu của bạn
              </p>
              <div className="relative">
                <Field
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Email"
                  className={`border-b-black w-80 border-b py-2 pl-10 placeholder:text-xl focus:border-b-primaryLight-100 focus:outline-none ${
                    errors.email && touched.email && '!border-b-error outline-error'
                  }`}
                />
                <span className="absolute left-0 top-0 flex size-10 items-center justify-center">
                  <img src={emailInputImage} alt="" />
                </span>
              </div>
              <div className="mt-2 self-start text-error">&#8205;{touched.email ? errors.email : ''}</div>
              <div className="relative">
                <Field
                  type="password"
                  id="password"
                  name="password"
                  placeholder="Mật khẩu"
                  className={`border-b-black w-80 border-b py-2 pl-10 placeholder:text-xl focus:border-b-primaryLight-100 focus:outline-none ${
                    errors.password && touched.password && '!border-b-error outline-error'
                  }`}
                />
                <span className="absolute left-0 top-0 flex size-10 items-center justify-center">
                  <img src={passwordInputImage} alt="" />
                </span>
              </div>
              <div className="mt-2 self-start text-error">&#8205;{touched.password ? errors.password : ''}</div>
              <Button
                type="submit"
                className="mt-4 h-12 w-52 rounded-full bg-primaryLight-100 text-xl text-neuturalLight-10"
              >
                Đăng nhập
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default Login;
