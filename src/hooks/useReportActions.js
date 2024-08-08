import reportApi from '@/apis/report.api';
import { useCallback, useState } from 'react';

const useReportActions = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [message, setMessage] = useState('');

  const fetchReports = useCallback(async (limit = 10, page = 1) => {
    setIsLoading(true);
    try {
      const response = await reportApi.getAll({ limit, page });
      setReports(response.data.data.reports);
      setTotalPage(response.data.data.totalPages);
    } catch (error) {
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { reports, isLoading, totalPage, message, fetchReports };
};

export default useReportActions;
