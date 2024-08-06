import userApi from '@/apis/user.api';
import { useCallback, useState } from 'react';

const useUserActions = () => {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [message, setMessage] = useState('');

  const fetchUsers = useCallback(async (limit = 10, page = 1) => {
    setIsLoading(true);
    try {
      const response = await userApi.getAll({ limit, page });
      setUsers(response.data.data.users);
      setTotalPage(response.data.data.totalPage);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const createUser = async (user) => {
    setIsLoading(true);
    try {
      const response = await userApi.create(user);
      await fetchUsers();
      setMessage(response.data.message);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    setIsLoading(true);
    try {
      const response = await userApi.delete(userId);
      await fetchUsers();
      setMessage(response.data.message);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    users,
    isLoading,
    totalPage,
    message,
    fetchUsers,
    createUser,
    deleteUser,
  };
};

export default useUserActions;
