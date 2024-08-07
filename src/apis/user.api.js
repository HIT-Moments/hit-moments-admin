import { ApiConstant } from '@/constants/api.constant';
import api from '.';

const userApi = {
  getAll: async ({ limit = 10, page = 1 }) => {
    return await api.get(ApiConstant.user.getAll, {
      params: {
        limit,
        page,
      },
    });
  },

  create: async (user) => {
    return await api.post(ApiConstant.user.create, {
      ...user,
    });
  },

  delete: async (userId) => {
    return await api.delete(`${ApiConstant.user.delete}/${userId}`);
  },

  get: async (userId) => {
    return await api.get(`${ApiConstant.user.get}/${userId}`);
  },

  update: async (userId, user) => {
    return await api.put(`${ApiConstant.user.update}/${userId}`, {
      ...user,
    });
  },
};

export default userApi;
