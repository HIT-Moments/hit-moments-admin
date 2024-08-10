import momentApi from '@/apis/moment.api';
import { convertDate } from '@/utils/convertDate';
import { useCallback, useState } from 'react';

const useMomentActions = () => {
  const [moments, setMoments] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [totalMoment, setTotalMoment] = useState(0);
  const [message, setMessage] = useState('');
  const [totalMomentsPerDay, setTotalMomentsPerDay] = useState([]);

  const fetchMoments = useCallback(async (limit = 10, page = 1) => {
    setIsLoading(true);
    try {
      const response = await momentApi.getAll({ limit, page });
      setMoments(response.data.data.moments);
      setTotalPage(response.data.data.totalPage);
      setTotalMoment(response.data.data.totalMoments);
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

  const fetchMomentsCurrentMonth = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await momentApi.getAllCurrentMonth();

      return response.data.data.totalMomentsPerDay.map((moment) => ({
        date: convertDate(moment.date).slice(9, 19),
        total: moment.total,
      }));
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    moments,
    isLoading,
    totalPage,
    totalMoment,
    totalMomentsPerDay,
    message,
    fetchMoments,
    deleteMoment,
    setTotalMomentsPerDay,
    fetchMomentsCurrentMonth,
  };
};

export default useMomentActions;
