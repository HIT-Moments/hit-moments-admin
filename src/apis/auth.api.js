import { ApiConstant } from '@/constants/api.constant';
import api from '.';

const authApi = {
  login: async ({ email, password }) => {
    return await api.post(ApiConstant.auth.login, {
      email,
      password,
    });
  },
};

export const { login } = authApi;
