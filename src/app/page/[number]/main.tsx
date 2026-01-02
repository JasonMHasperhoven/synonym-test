'use client';

import { useEffect, useState } from 'react';

import { NavButton } from '@/app/components/NavButton';
import { UserComponent } from '@/app/components/User';
import { UserPlaceholder } from '@/app/components/UserPlaceholder';
import { useNetworkStatus } from '@/app/hooks/useNetworkStatus';
import { selectUsersByPage, useUsersStore } from '@/app/store/usersStore';
import { User, UsersResponse } from '@/app/types/user';

import debounce from 'lodash/debounce';
import { toast } from 'sonner';

function Main({
  usersResp,
  ssrError,
  page
}: {
  usersResp: UsersResponse | null;
  ssrError: string | null;
  page: number;
}) {
  const [search, setSearch] = useState<string>('');
  const { loadUsers, searchUsers, data, search: searchState } = useUsersStore();
  const { users, isLoading, error } = selectUsersByPage(data, page);
  const isOnline = useNetworkStatus();

  const debouncedSearch = debounce(searchUsers, 200);

  useEffect(() => {
    // 1. push users from API to IndexedDB
    // 2. load users from IndexedDb
    loadUsers(page, usersResp);
  }, [loadUsers, page, usersResp]);

  useEffect(() => {
    debouncedSearch(search);
  }, [search, searchUsers]);

  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, [error]);

  useEffect(() => {
    if (ssrError) {
      // allow time to mount toaster
      requestAnimationFrame(() => {
        toast.error(ssrError);
      });
    }
  }, [ssrError]);

  useEffect(() => {
    if (!isOnline) {
      // allow time to mount toaster
      requestAnimationFrame(() => {
        toast.info('You are currently offline and may see stale results.');
      });
    }
  }, [isOnline]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl'>Users</h1>
      <input
        className='flex min-w-72 items-center gap-2 rounded-md border border-gray-200 bg-white p-1 md:min-w-96 md:p-2 dark:border-gray-700 dark:bg-gray-700'
        placeholder='Search for a user from locally stored data'
        value={search}
        onInput={(event) => setSearch(event.currentTarget.value)}
      />
      <div className='flex flex-col gap-2 rounded-lg bg-white p-4 md:p-6 dark:bg-gray-800'>
        {isLoading || searchState.isLoading || !users.length
          ? Array.from({ length: 10 }).map((_, index) => (
              <UserPlaceholder key={index} />
            ))
          : (searchState?.users?.length ? searchState?.users : users)?.map(
              (user: User) => (
                <UserComponent
                  key={user.id.value ?? user.login.uuid}
                  user={user}
                />
              )
            )}
      </div>
      <div className='flex items-center gap-2'>
        <NavButton direction='prev' href={`/page/${page - 1}`} />
        <NavButton direction='next' href={`/page/${page + 1}`} />
      </div>
    </main>
  );
}

export default Main;
