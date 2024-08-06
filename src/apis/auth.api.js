import { ApiConstant } from '@/constants/api.constant';
import api from '.';

const authApi = {
  login: async ({ email, password }) => {
    return await api.post(ApiConstant.auth.login, {
      email,
      password,
    });
  },

  getMe: async () => {
    return await api.get(ApiConstant.auth.getMe);
  },
};

export const { login, getMe } = authApi;
