import { User, UsersResponse } from '../types/user';
import { db } from './indexedDb';
import { create } from 'zustand';

interface UsersState {
  data: {
    // I chose to use this structure as it allows us
    // to easily set and access the data for a given page
    [page: number]: {
      users: User[];
      isLoading: boolean;
      error: string | null;
    };
  };
  loadUsers: (page: number, usersResp: UsersResponse | null) => void;
}

export const useUsersStore = create<UsersState>()((set) => ({
  data: {
    1: {
      users: [],
      isLoading: true,
      error: null
    }
  },
  loadUsers: async (page: number, usersResp: UsersResponse | null) => {
    set((prev) => ({
      data: {
        ...prev.data,
        [page]: { users: [], isLoading: true, error: null }
      }
    }));

    // test delay
    // await new Promise((resolve) => setTimeout(resolve, 5000));

    // test error
    // we could arguably call toast.error here instead of setting the error in the store
    // but I suppose that's a subjective decision
    // set((prev) => ({
    //   data: {
    //     ...prev.data,
    //     [page]: { users: [], isLoading: true, error: 'what happened here?' }
    //   }
    // }));

    try {
      // save users to IndexedDb
      if (usersResp?.results) {
        await db.usersByPage.put({ page, users: usersResp.results });
      }

      // load users from IndexedDb
      const data = await db.usersByPage.where('page').equals(page).first();
      const users = data?.users || [];

      set((prev) => ({
        data: {
          ...prev.data,
          [page]: { users, isLoading: false, error: null }
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
