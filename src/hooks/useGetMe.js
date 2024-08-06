import { useEffect, useState } from 'react';

import useAuth from '@/store/useAuth';
import { getMe } from '@/apis/auth.api';

const useGetMe = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const { setUser } = useAuth();

  useEffect(() => {
    const fetchMe = async () => {
      setIsLoading(true);
      try {
        const response = await getMe();
        setUser(response.data.data.user);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMe();
  }, [setUser]);

  return { isLoading, error };
};

export default useGetMe;
