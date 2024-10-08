import feedbackApi from '@/apis/feedback.api';
import { useCallback, useState } from 'react';

const useFeedbackActions = () => {
  const [feedbacks, setFeedbacks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [totalFeedback, setTotalFeedback] = useState(0);
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);

  const fetchFeedbacks = useCallback(async (limit = 5, page = 1) => {
    setIsLoading(true);
    try {
      const response = await feedbackApi.getAll({ limit, page });
      setFeedbacks(response.data.data.feedbacks);
      setTotalPage(response.data.data.totalPage);
      setMessage(response.data.message);
      setTotalFeedback(response.data.data.totalResults);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  return { feedbacks, isLoading, totalPage, totalFeedback, message, error, fetchFeedbacks };
};

export default useFeedbackActions;
