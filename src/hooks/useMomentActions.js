import momentApi from '@/apis/moment.api';
import { useCallback, useState } from 'react';

const useMomentActions = () => {
  const [moments, setMoments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [message, setMessage] = useState('');

  const fetchMoments = useCallback(async (limit = 10, page = 1) => {
    setIsLoading(true);
    try {
      const response = await momentApi.getAll({ limit, page });
      setMoments(response.data.data.moments);
      setTotalPage(response.data.data.totalPage);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteMoment = async (momentId) => {
    setIsLoading(true);
    try {
      const response = await momentApi.delete(momentId);
      await fetchMoments();
      setMessage(response.data.message);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  };

  return { moments, isLoading, totalPage, message, fetchMoments, deleteMoment };
};

export default useMomentActions;
