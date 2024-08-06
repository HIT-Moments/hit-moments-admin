import { useState } from 'react';

import useAuth from '@/store/useAuth';
import { login } from '@/apis/auth.api';

const useLogin = () => {
  const { loginState } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async ({ email, password }) => {
    setIsLoading(true);

    try {
      const { data } = await login({ email, password });

      if (data?.data?.user?.role !== 'admin') {
        throw new Error('Bạn không có quyền truy cập vào trang quản trị');
      }

      loginState(data?.data?.user, data?.data?.accessToken);
    } catch (error) {
      console.log(error);
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, handleLogin };
};

export default useLogin;
