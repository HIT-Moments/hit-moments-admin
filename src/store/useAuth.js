import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { removeToken, setToken } from '@/utils/authToken';

const useAuth = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isLoggedIn: false,

      loginState: (user, accessToken) => {
        set({ user, token: accessToken, isLoggedIn: true });
        setToken(accessToken);
      },

      logoutState: () => {
        set({ user: null, token: null, isLoggedIn: false });
        removeToken();
      },

      setUser: (user) => set({ user }),
    }),

    {
      name: 'auth-storage',
      partialize: (state) => ({ token: state.token, user: state.user }),
    },
  ),
);

export default useAuth;
