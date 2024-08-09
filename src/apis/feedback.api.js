import { ApiConstant } from '@/constants/api.constant';
import api from '.';

const feedbackApi = {
  getAll: async ({ limit = 5, page = 1 }) => {
    return await api.get(ApiConstant.feedback.getAll, {
      params: {
        limit,
        page,
      },
    });
  },
};

export default feedbackApi;
