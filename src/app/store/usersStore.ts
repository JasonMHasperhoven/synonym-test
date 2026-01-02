import { User, UsersResponse } from '../types/user';
import { create } from 'zustand';

interface UsersState {
  data: {
    [page: number]: {
      users: User[];
      isLoading: boolean;
      error: string | null;
    };
  };
  loadUsers: (page: number, usersResp: UsersResponse) => void;
}

export const useUsersStore = create<UsersState>()((set) => ({
  data: {},
  loadUsers: async (page: number, usersResp: UsersResponse) => {
    try {
      set((prev) => ({
        data: {
          ...prev.data,
          [page]: { users: usersResp.results, isLoading: false, error: null }
        }
      }));
    } catch (error) {
      set((prev) => ({
        data: {
          ...prev.data,
          [page]: { users: [], isLoading: false, error: error as string }
        }
      }));
    }
  }
}));

export const selectUsersByPage = (
  data: UsersState['data'] | undefined,
  page: number
) => data?.[page] || { users: [], isLoading: false, error: null };
