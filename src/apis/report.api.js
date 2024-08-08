import { ApiConstant } from '@/constants/api.constant';
import api from '.';

const reportApi = {
  getAll: async ({ limit = 10, page = 1 }) => {
    return await api.get(ApiConstant.report.getAll, {
      params: {
        limit,
        page,
      },
    });
  },
};

export default reportApi;
