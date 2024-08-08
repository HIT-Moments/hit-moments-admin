import { ApiConstant } from '@/constants/api.constant';
import api from '.';

const musicApi = {
  search: async ({ keyword, limit = 10, page = 1 }) => {
    return await api.get(ApiConstant.music.search, {
      params: {
        search: keyword,
        limit,
        page,
      },
    });
  },

  delete: async (id) => {
    return await api.delete(`${ApiConstant.music.delete}/${id}`);
  },
};

export default musicApi;
