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

  create: async () => {},

  delete: async () => {},
};

export default momentApi;
