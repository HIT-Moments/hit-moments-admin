import { ApiConstant } from '@/constants/api.constant';
import api from '.';

const momentApi = {
  getAll: async ({ limit = 10, page = 1 }) => {
    return await api.get(ApiConstant.moment.getAll, {
      params: {
        limit,
        page,
      },
    });
  },

  delete: async (momentId) => {
    return await api.delete(`${ApiConstant.moment.delete}/${momentId}`);
  },

  getAllCurrentMonth: async () => {
    return await api.get(ApiConstant.moment.getAllCurrentMonth);
  },
};

export default momentApi;
