import { User, UsersResponse } from '../types/user';
import { db } from './indexedDb';
import Fuse from 'fuse.js';
import uniqBy from 'lodash/uniqBy';
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
  search: {
    input: string;
    users: User[];
    isLoading: boolean;
    error: string | null;
  };
  loadUsers: (page: number, usersResp: UsersResponse | null) => void;
  searchUsers: (search: string) => void;
}

export const useUsersStore = create<UsersState>()((set) => ({
  data: {
    1: {
      users: [],
      isLoading: true,
      error: null
    }
  },
  search: {
    input: '',
    users: [],
    isLoading: false,
    error: null
  },
  loadUsers: async (page: number, usersResp: UsersResponse | null) => {
    set((prev) => ({
      ...prev,
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
        ...prev,
        data: {
          ...prev.data,
          [page]: { users, isLoading: false, error: null }
        }
      }));
    } catch (error) {
      set((prev) => ({
        ...prev,
        data: {
          ...prev.data,
          [page]: { users: [], isLoading: false, error: error as string }
        }
      }));
    }
  },
  searchUsers: async (search: string) => {
    if (!search.trim()) {
      return;
    }

    set((prev) => ({
      ...prev,
      search: {
        input: search,
        users: prev.search.input === search ? prev.search.users : [],
        isLoading: true,
        error: null
      }
    }));

    try {
      const allPages = await db.usersByPage.toArray();
      const allUsers = allPages.flatMap((pageData) => pageData.users);

      const fuse = new Fuse(allUsers, {
        keys: [
          { name: 'name.first', weight: 0.5 },
          { name: 'name.last', weight: 0.5 }
        ],
        threshold: 0.3
      });

      const searchResults = fuse.search(search);

      set((prev) => ({
        ...prev,
        search: {
          input: search,
          users: uniqBy(
            searchResults.map((result) => result.item),
            'id.value'
          ),
          isLoading: false,
          error: null
        }
      }));
    } catch (error) {
      set((prev) => ({
        ...prev,
        search: {
          input: search,
          users: [],
          isLoading: false,
          error: error as string
        }
      }));
    }
  }
}));

export const selectUsersByPage = (
  data: UsersState['data'] | undefined,
  page: number
) => data?.[page] || { users: [], isLoading: false, error: null };
