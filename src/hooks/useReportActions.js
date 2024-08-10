import reportApi from '@/apis/report.api';
import { useCallback, useState } from 'react';

const useReportActions = () => {
  const [reports, setReports] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [totalReport, setTotalReport] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const fetchReports = useCallback(async (limit = 10, page = 1) => {
    setIsLoading(true);
    try {
      const response = await reportApi.getAll({ limit, page });
      setReports(response.data.data.reports);
      setTotalPage(response.data.data.totalPages);
      setTotalReport(response.data.data.totalResults);
      setMessage(response.data.message);
    } catch (error) {
      setError(error);
      return error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { reports, isLoading, totalPage, totalReport, message, error, fetchReports };
};

export default useReportActions;
