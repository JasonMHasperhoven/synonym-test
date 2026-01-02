'use client';

import { useEffect } from 'react';

import { NavButton } from '@/app/components/NavButton';
import { UserComponent } from '@/app/components/User';
import { UserPlaceholder } from '@/app/components/UserPlaceholder';
import { selectUsersByPage, useUsersStore } from '@/app/store/usersStore';
import { User, UsersResponse } from '@/app/types/user';

function Main({ usersResp, page }: { usersResp: UsersResponse; page: number }) {
  const { loadUsers, data } = useUsersStore();
  const { users, isLoading, error } = selectUsersByPage(data, page);

  useEffect(() => {
    // load users from API to the store
    loadUsers(page, usersResp);
  }, [loadUsers, page, usersResp]);

  return (
    <main className='flex min-h-screen flex-col items-center justify-center gap-4'>
      <h1 className='text-2xl'>Users</h1>
      <div className='flex flex-col gap-2 rounded-lg bg-gray-800 p-6'>
        {isLoading
          ? Array.from({ length: 10 }).map((_, index) => (
              <UserPlaceholder key={index} />
            ))
          : users?.map((user: User) => (
              <UserComponent key={user.id.value} user={user} />
            ))}
      </div>
      <div className='flex items-center gap-2'>
        <NavButton direction='prev' href={`/page/${page - 1}`} />
        <NavButton direction='next' href={`/page/${page + 1}`} />
      </div>
    </main>
  );
}

export default Main;
