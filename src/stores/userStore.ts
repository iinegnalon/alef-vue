import { defineStore } from 'pinia';
import type { User } from '@/models/user';

interface UserStore {
  user: User | null;
}

export const useUserStore = defineStore('user', {
  state: (): UserStore => ({
    user: null,
  }),
  actions: {
    setUser(user: User) {
      this.user = user;
      localStorage.setItem('user', JSON.stringify(user));
    },

    clearUser() {
      this.user = null;
      localStorage.removeItem('user');
    },
  },
});
